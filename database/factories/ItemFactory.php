<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $itemNames  = ['pencil', 'headphones', 'necklace', 'piano', 'book', 'lamp', 'chair', 'phone', 'watch', 'wallet'];
        $qualities  = ['rough', 'good', 'rusted', 'smooth', 'excellent', 'damaged'];
        $customData = [];

        if (fake()->boolean(80)) {
            $customData['expires'] = fake()->dateTimeBetween('+1 month', '+2 years')->format('Y-m-d');
        }

        if (fake()->boolean(90)) {
            $customData['quantity'] = fake()->numberBetween(1, 100);
        }

        if (fake()->boolean(70)) {
            $customData['purchase_date'] = fake()->dateTimeBetween('-2 years', 'now')->format('Y-m-d');
        }

        if (fake()->boolean(60)) {
            $customData['quality'] = fake()->randomElement($qualities);
        }

        return [
            'name'        => fake()->randomElement($itemNames),
            'description' => fake()->sentence(),
            'notes'       => fake()->paragraph(),
            'image_path'  => fake()->image(),
            'custom_data' => json_encode($customData),
        ];
    }
}
