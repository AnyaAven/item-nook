<?php

namespace Database\Factories;

use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Team>
 */
class TeamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
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
