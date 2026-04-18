const gameData = [
    {
        id: 'elden-ring',
        name: 'Elden Ring',
        category: 'Action',
        platform: 'PC, PS5, Xbox Series X',
        releaseDate: '2022-02-25',
        developer: 'FromSoftware',
        link: 'https://www.bandainamcoent.com/games/elden-ring',
        videoId: 'E3KNZG3-Y6I',
        image: 'https://source.unsplash.com/1280x720/?gaming,fantasy',
        description: 'A vast open world of combat and discovery, powered by FromSoftware and George R. R. Martin.',
        screenshots: [
            'https://source.unsplash.com/900x500/?fantasy,game',
            'https://source.unsplash.com/900x500/?rpg,landscape',
            'https://source.unsplash.com/900x500/?medieval,battle'
        ],
        requirements: {
            min: ['Intel Core i5-8400', '12 GB RAM', 'NVIDIA GeForce GTX 1060 3GB', '60 GB available storage'],
            recommended: ['Intel Core i7-8700K', '16 GB RAM', 'NVIDIA GeForce RTX 2080', '60 GB available storage']
        },
        review: {
            rating: 4.9,
            score: '9.5/10',
            summary: 'Elden Ring delivers a landmark action RPG experience with deep exploration, memorable boss fights, and unrivaled atmosphere.',
            highlight: 'A must-play fantasy epic with one of the best open worlds of the generation.',
            pros: ['Expansive world design', 'Responsive combat', 'Rich lore and secrets'],
            cons: ['Steep learning curve', 'Occasional obscure navigation']
        }
    },
    {
        id: 'god-of-war-ragnarok',
        name: 'God of War Ragnarök',
        category: 'Action',
        platform: 'PS5, PS4',
        releaseDate: '2022-11-09',
        developer: 'Santa Monica Studio',
        link: 'https://www.playstation.com/games/god-of-war-ragnarok/',
        videoId: 'AjuW1M7-3Oc',
        image: 'https://source.unsplash.com/1280x720/?gaming,mythology',
        description: 'Kratos and Atreus battle Norse gods, exploring strong characters and cinematic action.',
        screenshots: [
            'https://source.unsplash.com/900x500/?norse,game',
            'https://source.unsplash.com/900x500/?mythology,gameplay',
            'https://source.unsplash.com/900x500/?warrior,battle'
        ],
        requirements: {
            min: ['Intel Core i5-6600', '8 GB RAM', 'NVIDIA GeForce GTX 960', '70 GB available storage'],
            recommended: ['Intel Core i7-4770K', '16 GB RAM', 'NVIDIA GeForce GTX 1060 6GB', '70 GB available storage']
        },
        review: {
            rating: 4.8,
            score: '9.3/10',
            summary: 'A cinematic action adventure with intense combat and gripping storytelling that raises the franchise to new heights.',
            highlight: 'Excellent narrative depth and polished presentation for fans and newcomers alike.',
            pros: ['Beautiful presentation', 'Strong character work', 'Engaging combat'],
            cons: ['Linear mission structure', 'Long loading times on older consoles']
        }
    },
    {
        id: 'resident-evil-4-remake',
        name: 'Resident Evil 4 Remake',
        category: 'Horror',
        platform: 'PC, PS5, Xbox Series X',
        releaseDate: '2023-03-24',
        developer: 'Capcom',
        link: 'https://www.residentevil.com/re4/',
        videoId: 'wySGFRO1l50',
        image: 'https://source.unsplash.com/1280x720/?gaming,horror',
        description: 'A modern reimagining of the horror classic with intense atmosphere and survival combat.',
        screenshots: [
            'https://source.unsplash.com/900x500/?horror,game',
            'https://source.unsplash.com/900x500/?survival,horror',
            'https://source.unsplash.com/900x500/?dark,gameplay'
        ],
        requirements: {
            min: ['Intel Core i5-4460', '8 GB RAM', 'NVIDIA GeForce GTX 760', '30 GB available storage'],
            recommended: ['Intel Core i7-7700', '16 GB RAM', 'NVIDIA GeForce GTX 1060', '30 GB available storage']
        },
        review: {
            rating: 4.7,
            score: '9.0/10',
            summary: 'Resident Evil 4 Remake combines survival horror suspense with modern visuals and combat improvements.',
            highlight: 'A polished rework that keeps the original spirit while delivering next-gen thrills.',
            pros: ['Immersive atmosphere', 'Updated combat', 'High replay value'],
            cons: ['Short campaign', 'Less open exploration than other horror titles']
        }
    },
    {
        id: 'horizon-forbidden-west',
        name: 'Horizon Forbidden West',
        category: 'Open World',
        platform: 'PS5, PS4',
        releaseDate: '2022-02-18',
        developer: 'Guerrilla Games',
        link: 'https://www.playstation.com/games/horizon-forbidden-west/',
        videoId: 'vS_2wmY_0WY',
        image: 'https://source.unsplash.com/1280x720/?gaming,open-world',
        description: 'A lush futuristic open world packed with robotic creatures, quests, and exploration.',
        screenshots: [
            'https://source.unsplash.com/900x500/?futuristic,landscape',
            'https://source.unsplash.com/900x500/?robot,game',
            'https://source.unsplash.com/900x500/?adventure,open-world'
        ],
        requirements: {
            min: ['Intel Core i5-6600', '8 GB RAM', 'NVIDIA GeForce GTX 970', '100 GB available storage'],
            recommended: ['Intel Core i7-6700K', '16 GB RAM', 'NVIDIA GeForce GTX 1080', '100 GB available storage']
        },
        review: {
            rating: 4.6,
            score: '8.8/10',
            summary: 'A visually stunning open world with strong story beats and exciting machine-hunting gameplay.',
            highlight: 'One of the best-looking open-world adventure games available on PlayStation.',
            pros: ['Spectacular visuals', 'Strong story', 'Varied combat'],
            cons: ['Repetitive side missions', 'Can feel overwhelming']
        }
    },
    {
        id: 'valorant',
        name: 'Valorant',
        category: 'Shooter',
        platform: 'PC',
        releaseDate: '2020-06-02',
        developer: 'Riot Games',
        link: 'https://playvalorant.com/',
        videoId: 'u7648e8pS5o',
        image: 'https://source.unsplash.com/1280x720/?gaming,esports',
        description: 'A tactical hero shooter with tight gunplay, unique agents, and competitive rounds.',
        screenshots: [
            'https://source.unsplash.com/900x500/?tactical,shooter',
            'https://source.unsplash.com/900x500/?esports,game',
            'https://source.unsplash.com/900x500/?shooter,match'
        ],
        requirements: {
            min: ['Intel Core i3-4150', '4 GB RAM', 'Intel HD 3000', '8 GB available storage'],
            recommended: ['Intel Core i5-4460', '4 GB RAM', 'NVIDIA GeForce GTX 1050 Ti', '8 GB available storage']
        },
        review: {
            rating: 4.4,
            score: '8.5/10',
            summary: 'Valorant is a polished competitive shooter with unique agent kits and a strong community presence.',
            highlight: 'Ideal for players seeking team-based strategy and esports-ready gameplay.',
            pros: ['Tight gunplay', 'Strategic depth', 'Frequent updates'],
            cons: ['Steep competitive climb', 'Limited solo queue rewards']
        }
    },
    {
        id: 'cyberpunk-2077',
        name: 'Cyberpunk 2077',
        category: 'Open World',
        platform: 'PC, PS5, Xbox Series X',
        releaseDate: '2020-12-10',
        developer: 'CD Projekt Red',
        link: 'https://www.cyberpunk.net/',
        videoId: 'qIcTM8WXFjk',
        image: 'https://source.unsplash.com/1280x720/?gaming,cyberpunk',
        description: 'A neon-soaked open city with deep narrative choice, custom builds, and futuristic freedom.',
        screenshots: [
            'https://source.unsplash.com/900x500/?neon,city',
            'https://source.unsplash.com/900x500/?sci-fi,game',
            'https://source.unsplash.com/900x500/?cyberpunk,street'
        ],
        requirements: {
            min: ['Intel Core i5-3570K', '8 GB RAM', 'NVIDIA GeForce GTX 780', '70 GB available storage'],
            recommended: ['Intel Core i7-4790', '12 GB RAM', 'NVIDIA GeForce GTX 1060', '70 GB available storage']
        },
        review: {
            rating: 4.1,
            score: '7.9/10',
            summary: 'Cyberpunk 2077 offers a rich, sprawling city to explore with strong story moments and extensive customization.',
            highlight: 'Great for players who love immersive RPG worlds and futuristic settings.',
            pros: ['Deep narrative options', 'Huge city world', 'Strong visual style'],
            cons: ['Performance issues on older hardware', 'Some pacing issues']
        }
    },
    {
        id: 'hellblade-2',
        name: 'Senua\'s Saga: Hellblade 2',
        category: 'Action',
        platform: 'PC, Xbox Series X',
        releaseDate: '2026-11-15',
        developer: 'Ninja Theory',
        link: 'https://hellblade.com/',
        videoId: 'BFAWzJ2gfC4',
        image: 'https://source.unsplash.com/1280x720/?gaming,dark-fantasy',
        description: 'A powerful psychological action adventure following Senua through a haunting mythic journey.',
        screenshots: [
            'https://source.unsplash.com/900x500/?fantasy,warrior',
            'https://source.unsplash.com/900x500/?dark,epic',
            'https://source.unsplash.com/900x500/?mystical,game'
        ],
        requirements: {
            min: ['Intel Core i5-8400', '16 GB RAM', 'NVIDIA GeForce RTX 2060', '50 GB available storage'],
            recommended: ['Intel Core i7-9700K', '16 GB RAM', 'NVIDIA GeForce RTX 3080', '50 GB available storage']
        },
        review: {
            rating: 4.7,
            score: '9.1/10',
            summary: 'A cinematic action game with stunning visuals and a moving psychological story.',
            highlight: 'Perfect for players who want rich lore and an emotional single-player journey.',
            pros: ['Gorgeous presentation', 'Strong storytelling', 'Intense combat'],
            cons: ['Niche pacing', 'Less open-world freedom']
        }
    },
    {
        id: 'minecraft',
        name: 'Minecraft',
        category: 'Open World',
        platform: 'PC, Console, Mobile',
        releaseDate: '2011-11-18',
        developer: 'Mojang Studios',
        link: 'https://www.minecraft.net/',
        videoId: 'MUBL3EZ2pMA',
        image: 'https://source.unsplash.com/1280x720/?gaming,adventure',
        description: 'Build, explore, and survive in a limitless block-based world with friends and mods.',
        screenshots: [
            'https://source.unsplash.com/900x500/?building,game',
            'https://source.unsplash.com/900x500/?adventure,block',
            'https://source.unsplash.com/900x500/?sandbox,game'
        ],
        requirements: {
            min: ['Intel Pentium D', '4 GB RAM', 'Intel HD Graphics', '1 GB available storage'],
            recommended: ['Intel Core i5', '8 GB RAM', 'NVIDIA GeForce GTX 1050', '4 GB available storage']
        },
        review: {
            rating: 4.8,
            score: '9.0/10',
            summary: 'Minecraft remains a timeless sandbox classic with endless creativity and multiplayer fun.',
            highlight: 'A strong evergreen title for creators, streamers, and casual gamers.',
            pros: ['Infinite creativity', 'Massive community', 'Mod support'],
            cons: ['Simple visuals', 'No defined ending']
        }
    },
    {
        id: 'apex-legends',
        name: 'Apex Legends',
        category: 'Shooter',
        platform: 'PC, PS5, Xbox Series X',
        releaseDate: '2019-02-04',
        developer: 'Respawn Entertainment',
        link: 'https://www.ea.com/games/apex-legends',
        videoId: '0lPOa8-KeEY',
        image: 'https://source.unsplash.com/1280x720/?gaming,battle-royale',
        description: 'A fast-paced battle royale with heroes, team synergy, and high-mobility combat.',
        screenshots: [
            'https://source.unsplash.com/900x500/?battle-royale,game',
            'https://source.unsplash.com/900x500/?team,shooter',
            'https://source.unsplash.com/900x500/?action,gameplay'
        ],
        requirements: {
            min: ['Intel Core i3-6300', '6 GB RAM', 'NVIDIA GeForce GT 640', '22 GB available storage'],
            recommended: ['Intel Core i5-3570K', '8 GB RAM', 'NVIDIA GeForce GTX 970', '22 GB available storage']
        },
        review: {
            rating: 4.5,
            score: '8.7/10',
            summary: 'A polished battle royale with strong team mechanics, fast movement, and regular seasonal updates.',
            highlight: 'Excellent for competitive players and content creators looking for high-energy matches.',
            pros: ['Fast-paced action', 'Strong teamplay', 'Regular updates'],
            cons: ['Occasional balance issues', 'Season pass grind']
        }
    },
    {
        id: 'skyrim',
        name: 'The Elder Scrolls V: Skyrim',
        category: 'Open World',
        platform: 'PC, Console',
        releaseDate: '2011-11-11',
        developer: 'Bethesda Game Studios',
        link: 'https://elderscrolls.bethesda.net/skyrim',
        videoId: 'JSRtYpNRoN0',
        image: 'https://source.unsplash.com/1280x720/?gaming,medieval',
        description: 'An open fantasy epic with dragons, magic, and infinite quests across Tamriel.',
        screenshots: [
            'https://source.unsplash.com/900x500/?dragon,game',
            'https://source.unsplash.com/900x500/?fantasy,landscape',
            'https://source.unsplash.com/900x500/?castle,game'
        ],
        requirements: {
            min: ['Intel Core 2 Duo', '2 GB RAM', 'DirectX 9.0c', '6 GB available storage'],
            recommended: ['Intel Core i5-750', '4 GB RAM', 'NVIDIA GeForce GTX 470', '6 GB available storage']
        },
        review: {
            rating: 4.6,
            score: '9.2/10',
            summary: 'Skyrim remains a beloved open-world adventure with deep mod support and endless replay value.',
            highlight: 'A classic RPG experience that still feels massive and inviting.',
            pros: ['Immersive world', 'Rich modding', 'Memorable quests'],
            cons: ['Aging visuals', 'Some dated mechanics']
        }
    },
    {
        id: 'among-us',
        name: 'Among Us',
        category: 'Action',
        platform: 'PC, Mobile, Console',
        releaseDate: '2018-11-16',
        developer: 'Innersloth',
        link: 'https://www.innersloth.com/gameAmongUs.php',
        videoId: 'NS6ldv5OVdA',
        image: 'https://source.unsplash.com/1280x720/?gaming,space',
        description: 'A social deduction party game where crewmates complete tasks and impostors sabotage the mission.',
        screenshots: [
            'https://source.unsplash.com/900x500/?space,game',
            'https://source.unsplash.com/900x500/?party,game',
            'https://source.unsplash.com/900x500/?mystery,game'
        ],
        requirements: {
            min: ['1.0 GHz Processor', '1 GB RAM', 'Intel HD Graphics', '250 MB available storage'],
            recommended: ['2.0 GHz Processor', '2 GB RAM', 'Intel HD 4000', '250 MB available storage']
        },
        review: {
            rating: 4.3,
            score: '8.4/10',
            summary: 'Among Us is a fun social experience that is easy to play and perfect for groups.',
            highlight: 'Great for streamers and casual groups looking for fast, engaging matches.',
            pros: ['Great party game', 'Simple to learn', 'Strong replay value'],
            cons: ['Can be repetitive', 'Best with friends']
        }
    }
];
