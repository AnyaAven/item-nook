# Factory for many-to-many relationship
## Teams <--> Users with Jetstream

---

The goal is to create a seeder that populates teams with users and users with teams.

The first issue was one user was created automatically when creating a team.
```injectablephp
class TeamFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->company(),
            'user_id' => User::factory(), // Creating a team automatically makes one user.
            'personal_team' => true,
        ];
    }
}
```

---
## What is a Personal Team?

When a user registers, Gary Ogswald, they automatically join a personal team, "Gary Ogswald's Team."

---
## One user issue
When we create our `$team` we also create one user. 
This user sets `current_team_id` to null.
When we set up the next 5 users to that specific team, it attaches correctly.

```injectablephp
class DatabaseDataSeeder extends Seeder
{
    public function run(): void
    {
        $team = Team::factory()
            ->state(['name' => 'First Factory Team'])
            ->create();
     
        User::factory()->count(5)->create([
            'current_team_id' => $team->id,
        ]);
    }
}
```

So why is it that we have 1 user that isn't linked to a team?
Well the `TeamFactory` is creating one BUT NOT linking it to it's id.
This means the user does not have a team

## Magic Function: `hasTeams()` 

This will use laravel magic to use `hasTeams()` and full the name of the method
to find the table of teams. But, it is not doing anything here since we use the `create()`
```injectablephp
class DatabaseDataSeeder extends Seeder
{
    public function run(): void
    {
        $team = Team::factory()
            ->state(['name' => 'First Factory Team'])
            ->create();
     
        User::factory(3)
            ->hasTeams()
            ->create([
                'current_team_id' => $team->id,
            ]);
    }
}
```

## First attempt at a fix:
The TeamFactory should not be setting up `user_id` as it has a pivot table.
This involved changing the migration file to remove `user_id` as well.

The previous seeds did not leverage the `team_user` pivot table, with these fixes it does.

`TeamFactory.php`
```injectablephp
class TeamFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'          => $this->faker->unique()->company(),
            // 'user_id'       => User::factory(),
            'personal_team' => true,
        ];
    }
```

`migration -create teams`
```injectablephp
Schema::create('teams', function(Blueprint $table) {
            $table->id();
//            $table->foreignId('user_id')->index()
            $table->string('name');
            $table->boolean('personal_team');
            $table->timestamps();
        });
```

## Correct fix:
Never mind! We need `user_id` on the TeamFactory as this represents the owner.
The owner may _own_ the team but not be _apart_ of the team, which is why we 
need to connect the `current_team_id` after creating a user, `User::factory()`.

`TeamFactory.php`
```injectablephp
class TeamFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'          => $this->faker->unique()->company(),
            'user_id'       => User::factory(), // This is the owner of the team
            'personal_team' => true,
        ];
    }

    public function configure(): TeamFactory
    {
        /**
         * The current_team_id represents what team the user is actively viewing
         */
        return $this->afterCreating(function (Team $team) {
            $team->owner()->update(['current_team_id' => $team->id]);
        });
    }
}
```

We need to use `attach()` as we need to use the `team_user` pivot table that 
makes a many-to-many relationship.

This will result in one team with one owner (not in the team) and three team members.

`DatabaseDataSeeder`
````injectablephp
class DatabaseDataSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $team = Team::factory()
            ->state(['name' => 'First Factory Team'])
            ->create();

        User::factory(3)
            ->create()
            ->each(function(User $user) use ($team) {
                $user->teams()->attach($team, ['role' => 'member']);
                $user->update(['current_team_id' => $team->id]); // active viewing team for each user
            });
        
        //.....
    }
}
````

## Overall Experience
---
The Jetstream documentation does not guide you. Not. One. Bit.

What I wish it had was a model diagram and an explanation. 
It's very unclear that `user_id` is the owner id for the team's table. 
To learn about this, it was necessary to step into `hasTeams` trait and 
Team class at `vendor/laravel/jetstream/src/Team.php`.

This showed me the `owner()` method.
```injectablephp
public function owner()
    {
        return $this->belongsTo(Jetstream::userModel(), 'user_id');
    }
```

---
 ## Resources
- [Docs](https://jetstream.laravel.com/introduction.html)

- [North Meets South podcast](https://www.northmeetssouth.audio/82)
This is an interesting discussion about teams in Laravel.


