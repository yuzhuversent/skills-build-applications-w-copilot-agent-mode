from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models
from octofit_tracker import models as app_models

from django.conf import settings

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete all data
        User = get_user_model()
        User.objects.all().delete()
        Team = self.get_or_create_team_model()
        Team.objects.all().delete()
        Activity = self.get_or_create_activity_model()
        Activity.objects.all().delete()
        Leaderboard = self.get_or_create_leaderboard_model()
        Leaderboard.objects.all().delete()
        Workout = self.get_or_create_workout_model()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users
        users = [
            User.objects.create_user(username='ironman', email='ironman@marvel.com', password='password', team=marvel),
            User.objects.create_user(username='spiderman', email='spiderman@marvel.com', password='password', team=marvel),
            User.objects.create_user(username='batman', email='batman@dc.com', password='password', team=dc),
            User.objects.create_user(username='superman', email='superman@dc.com', password='password', team=dc),
        ]

        # Create activities
        activities = [
            Activity.objects.create(user=users[0], type='run', duration=30, distance=5),
            Activity.objects.create(user=users[1], type='cycle', duration=45, distance=20),
            Activity.objects.create(user=users[2], type='swim', duration=60, distance=2),
            Activity.objects.create(user=users[3], type='run', duration=25, distance=4),
        ]

        # Create workouts
        workouts = [
            Workout.objects.create(name='Morning Cardio', description='Cardio for all'),
            Workout.objects.create(name='Strength Training', description='Strength for all'),
        ]

        # Create leaderboard
        Leaderboard.objects.create(user=users[0], score=100)
        Leaderboard.objects.create(user=users[1], score=90)
        Leaderboard.objects.create(user=users[2], score=95)
        Leaderboard.objects.create(user=users[3], score=85)

        self.stdout.write(self.style.SUCCESS('Database populated with test data.'))

    def get_or_create_team_model(self):
        from django.db import models
        class Team(models.Model):
            name = models.CharField(max_length=100, unique=True)
            def __str__(self):
                return self.name
        return Team

    def get_or_create_activity_model(self):
        from django.db import models
        User = get_user_model()
        class Activity(models.Model):
            user = models.ForeignKey(User, on_delete=models.CASCADE)
            type = models.CharField(max_length=50)
            duration = models.IntegerField()
            distance = models.FloatField()
        return Activity

    def get_or_create_leaderboard_model(self):
        from django.db import models
        User = get_user_model()
        class Leaderboard(models.Model):
            user = models.ForeignKey(User, on_delete=models.CASCADE)
            score = models.IntegerField()
        return Leaderboard

    def get_or_create_workout_model(self):
        from django.db import models
        class Workout(models.Model):
            name = models.CharField(max_length=100)
            description = models.TextField()
        return Workout
