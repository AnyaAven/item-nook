<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\Space;
use App\Models\Team;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

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
                $user->update(['current_team_id' => $team->id]);
            });

        //         Empty space
        Space::factory()
            ->for($team)
            ->create();

        Space::factory()
            ->state(['name' => 'Factory Space'])
            ->has(Item::factory()->count(6))
            ->for($team)
            ->create();
    }
}
