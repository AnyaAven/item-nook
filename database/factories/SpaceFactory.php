<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Space>
 */
class SpaceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $spaceNames = ['Art Room', 'Bedroom', 'Honda Car', 'Piano Room', 'Toolbox', 'Bookshelf'];

        return [
            'name'        => fake()->randomElement($spaceNames),
            'image_path'  => fake()->image(),
        ];
    }
}
