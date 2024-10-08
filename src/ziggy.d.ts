/* This file is generated by Ziggy. */
declare module 'ziggy-js' {
  interface RouteList {
    "debugbar.openhandler": [],
    "debugbar.clockwork": [
        {
            "name": "id",
            "required": true
        }
    ],
    "debugbar.assets.css": [],
    "debugbar.assets.js": [],
    "debugbar.cache.delete": [
        {
            "name": "key",
            "required": true
        },
        {
            "name": "tags",
            "required": false
        }
    ],
    "logout": [],
    "password.email": [],
    "password.update": [],
    "user-profile-information.update": [],
    "user-password.update": [],
    "password.confirmation": [],
    "password.confirm": [],
    "two-factor.enable": [],
    "two-factor.confirm": [],
    "two-factor.disable": [],
    "two-factor.qr-code": [],
    "two-factor.secret-key": [],
    "two-factor.recovery-codes": [],
    "sanctum.csrf-cookie": [],
    "ignition.healthCheck": [],
    "ignition.executeSolution": [],
    "ignition.updateConfig": [],
    "api.": [],
    "api.terms.show": [],
    "api.policy.show": [],
    "api.profile.show": [],
    "api.other-browser-sessions.destroy": [],
    "api.current-user-photo.destroy": [],
    "api.current-user.destroy": [],
    "api.api-tokens.index": [],
    "api.api-tokens.store": [],
    "api.api-tokens.update": [
        {
            "name": "token",
            "required": true
        }
    ],
    "api.api-tokens.destroy": [
        {
            "name": "token",
            "required": true
        }
    ],
    "api.teams.create": [],
    "api.teams.store": [],
    "api.teams.show": [
        {
            "name": "team",
            "required": true
        }
    ],
    "api.teams.update": [
        {
            "name": "team",
            "required": true
        }
    ],
    "api.teams.destroy": [
        {
            "name": "team",
            "required": true
        }
    ],
    "api.current-team.update": [],
    "api.team-members.store": [
        {
            "name": "team",
            "required": true
        }
    ],
    "api.team-members.update": [
        {
            "name": "team",
            "required": true
        },
        {
            "name": "user",
            "required": true
        }
    ],
    "api.team-members.destroy": [
        {
            "name": "team",
            "required": true
        },
        {
            "name": "user",
            "required": true
        }
    ],
    "api.team-invitations.accept": [
        {
            "name": "invitation",
            "required": true
        }
    ],
    "api.team-invitations.destroy": [
        {
            "name": "invitation",
            "required": true
        }
    ]
}
}
export {};
