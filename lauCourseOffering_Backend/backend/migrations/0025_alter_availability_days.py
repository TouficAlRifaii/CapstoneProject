# Generated by Django 4.1.3 on 2023-05-19 02:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0024_alter_availability_end_alter_availability_start'),
    ]

    operations = [
        migrations.AlterField(
            model_name='availability',
            name='days',
            field=models.CharField(max_length=5),
        ),
    ]
