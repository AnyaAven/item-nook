<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\Space;
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
        User::factory(10)->create();

        // Empty space
        Space::factory()->count(1)->create();

        Space::factory()
            ->state(['name' => 'Factory Space'])
            ->has(Item::factory()->count(6))
            ->create();
    }
}
