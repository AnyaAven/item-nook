<?php

use App\Models\User;
use Illuminate\Support\Str;
use Laravel\Jetstream\Features;

test('api tokens can index', function() {
    $this->actingAs($user = User::factory()->create());

    $response = $this->getJson(route('api.api-tokens.index'));
    $response->assertSuccessful();

    $response->assertExactJson([
       'tokens' => [],
       'availablePermissions' => [
           'create',
           'delete',
           'read',
           'update',
       ],
       'defaultPermissions' => [
           'read'
       ]
    ]);
});

test('api token permissions can be updated', function () {
    if (Features::hasTeamFeatures()) {
        $this->actingAs($user = User::factory()->withPersonalTeam()->create());
    } else {
        $this->actingAs($user = User::factory()->create());
    }

    $token = $user->tokens()->create([
        'name' => 'Test Token',
        'token' => Str::random(40),
        'abilities' => ['create', 'read'],
    ]);

    $response = $this->put(route('api.api-tokens.update', $token), [
        'name' => $token->name,
        'permissions' => [
            'delete',
            'missing-permission',
        ],
    ]);
    $response->assertSuccessful();

    expect($user->fresh()->tokens->first())
        ->can('delete')->toBeTrue()
        ->can('read')->toBeFalse()
        ->can('missing-permission')->toBeFalse();
})->skip(function () {
    return ! Features::hasApiFeatures();
}, 'API support is not enabled.');
