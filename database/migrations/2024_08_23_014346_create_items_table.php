<?php

use App\Models\Space;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('items', function(Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Space::class)->constrained();
            $table->text('description')->nullable();
            $table->text('notes')->nullable();
            $table->string('name');
            $table->string('image_path')->nullable();
            $table->json('custom_data');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
