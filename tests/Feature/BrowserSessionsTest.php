<?php

use App\Models\User;

test('other browser sessions can be logged out', function () {
    $this->actingAs(User::factory()->create());

    $response = $this->delete('api/user/other-browser-sessions', [
        'password' => 'password',
    ]);

    $response->assertSessionHasNoErrors();
});
