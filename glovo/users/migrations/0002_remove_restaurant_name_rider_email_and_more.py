# Generated by Django 5.0.4 on 2024-05-04 09:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='restaurant',
            name='name',
        ),
        migrations.AddField(
            model_name='rider',
            name='email',
            field=models.CharField(default='email', max_length=100),
        ),
        migrations.AlterField(
            model_name='customer',
            name='email',
            field=models.CharField(default='email', max_length=100),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='email',
            field=models.CharField(default='email', max_length=100),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='phone',
            field=models.CharField(blank=True, default='00000', max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='rider',
            name='balance',
            field=models.FloatField(default=0.0),
        ),
        migrations.AlterField(
            model_name='rider',
            name='phone',
            field=models.CharField(blank=True, default='00000', max_length=20, null=True),
        ),
    ]
