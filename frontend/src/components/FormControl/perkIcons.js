import FontIcon from 'material-ui/FontIcon';

const perkIcons = {
    'ROLLING MODIFIER': {
        component: FontIcon,
        props: {
            className:"gloomhaven-icon-condition-rolling-modifier"
        },
        children: null
    },
    'AIR': {
        component: FontIcon,
        props: {
            className:"gloomhaven-icon-element-air"
        },
        children: null
    },
    'DARK': {
        component: FontIcon,
        props: {
            className:"gloomhaven-icon-element-dark"
        },
        children: null
    },
    'EARTH': {
        component: FontIcon,
        props: {
            className:"gloomhaven-icon-element-earth"
        },
        children: null
    },
    'FIRE': {
        component: FontIcon,
        props: {
            className:"gloomhaven-icon-element-fire"
        },
        children: null
    },
    'ICE': {
        component: FontIcon,
        props: {
            className:"gloomhaven-icon-element-ice"
        },
        children: null
    },
    'LIGHT': {
        component: FontIcon,
        props: {
            className:"gloomhaven-icon-element-light"
        },
        children: null
    },
    'ADD TARGET': {
        component: 'span',
        props: null,
        children: [
            'ADD TARGET',
            {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-condition-add-target"
                },
                children: null
            }
        ]
    },
    'BLESS': {
        component: 'span',
        props: null,
        children: [
            'BLESS',
            {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-condition-bless"
                },
                children: null
            }
        ]
    },
    'CURSE': {
        component: 'span',
        props: null,
        children: [
            'CURSE',
            {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-condition-curse"
                },
                children: null
            }
        ]
    },
    'DISARM': {
        component: 'span',
        props: null,
        children: [
            'DISARM',
            {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-condition-disarm"
                },
                children: null
            }
        ]
    },
    'PUSH': {
        component: 'span',
        props: null,
        children: [
            'PUSH',
            {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-condition-push"
                },
                children: null
            }
        ]
    },
    'PULL': {
        component: 'span',
        props: null,
        children: [
            'PULL',
            {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-condition-pull"
                },
                children: null
            }
        ]
    },
    'PIERCE': {
        component: 'span',
        props: null,
        children: [
            'PIERCE',
            {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-condition-pierce"
                },
                children: null
            }
        ]
    },
    'POISON': {
        component: 'span',
        props: null,
        children: [
            'POISON',
            {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-condition-poison"
                },
                children: null
            }
        ]
    },
    'MUDDLE': {
        component: 'span',
        props: null,
        children: [
            'MUDDLE',
            {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-condition-muddle"
                },
                children: null
            }
        ]
    },
    'IMMOBILIZE': {
        component: 'span',
        props: null,
        children: [
            'IMMOBILIZE',
            {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-condition-immobilize"
                },
                children: null
            }
        ]
    },
    'INVISIBLE': {
        component: 'span',
        props: null,
        children: [
            'INVISIBLE',
            {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-condition-invisibility"
                },
                children: null
            }
        ]
    },
    'STUN': {
        component: 'span',
        props: null,
        children: [
            'STUN',
            {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-condition-stun"
                },
                children: null
            }
        ]
    },
    'WOUND': {
        component: 'span',
        props: null,
        children: [
            'WOUND',
            {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-condition-wound"
                },
                children: null
            }
        ]
    },
    'Heal': {
        component: 'span',
        props: null,
        children: [
            'Heal',
            {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-general-heal"
                },
                children: null
            }
        ]
    },
    'Shield': {
        component: 'span',
        props: null,
        children: [
            'Shield',
            {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-general-shield"
                },
                children: null
            }
        ]
    }
};

export { perkIcons as default };
