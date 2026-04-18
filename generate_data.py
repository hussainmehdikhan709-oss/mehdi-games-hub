from pathlib import Path
import re

action = [
    "God of War Ragnarök", "Marvel's Spider-Man 2", "Elden Ring", "Devil May Cry 5", "Sekiro: Shadows Die Twice",
    "Batman: Arkham City", "Hades", "Bloodborne", "Ghost of Tsushima", "Sifu", "Bayonetta 3", "Metal Gear Rising",
    "Dead Cells", "Nier: Automata", "Astral Chain", "Ninja Gaiden", "Katana ZERO", "Ghostrunner", "Monster Hunter: World",
    "Control", "Star Wars Jedi: Survivor", "Horizon Forbidden West", "Doom Eternal", "Returnal", "Hollow Knight",
    "Darksiders III", "Middle-earth: Shadow of War", "Infamous Second Son", "Prototype 2", "Sleeping Dogs", "Mad Max",
    "Just Cause 4", "Saints Row", "Assassin's Creed Mirage", "For Honor", "Shadow of the Tomb Raider",
    "Prince of Persia: The Lost Crown", "Ryse: Son of Rome", "Hellblade: Senua's Sacrifice", "Dying Light 2", "Dishonored 2",
    "Wolfenstein II", "BioShock Infinite", "Titanfall 2", "Max Payne 3", "Splinter Cell: Blacklist", "Hitman 3",
    "Watch Dogs 2", "Mafia: Definitive Edition", "Yakuza: Like a Dragon", "Judgement", "Sleeping Dogs", "Quantum Break",
    "Sunset Overdrive", "Gears 5", "Halo Infinite", "Vanquish", "Enslaved: Odyssey to the West", "No More Heroes 3",
    "Castlevania: Lords of Shadow", "Dragon's Dogma 2", "Final Fantasy VII Rebirth", "Kingdom Hearts III", "Scarlet Nexus",
    "Tales of Arise", "Code Vein", "Granblue Fantasy: Relink", "Lies of P", "Wo Long: Fallen Dynasty", "Nioh 2",
    "The Surge 2", "Remnant 2", "Warframe", "Destiny 2", "Outriders", "Bulletstorm", "Rage 2", "Far Cry 6",
    "Borderlands 3", "Serious Sam 4", "Duke Nukem Forever", "Painkiller", "Shadow Warrior 3", "Trek to Yomi",
    "Evil West", "Gungrave G.O.R.E", "Wanted: Dead", "Bayonetta", "Vanquish", "Metal Slug Tactics", "Streets of Rage 4",
    "TMNT: Shredder's Revenge", "River City Girls 2", "My Friend Pedro", "Hotline Miami 2", "Ruiner", "Superhot",
    "Hyper Light Drifter", "Blasphemous 2", "Ori and the Will of the Wisps"
]

horror = [
    "Resident Evil 4 Remake", "Silent Hill 2", "Outlast", "Amnesia: The Bunker", "Alien: Isolation", "Dead Space",
    "Alan Wake 2", "Phasmophobia", "Dead by Daylight", "Five Nights at Freddy's", "The Evil Within 2",
    "Fatal Frame: Maiden of Black Water", "Until Dawn", "Little Nightmares II", "Layers of Fear", "Soma", "P.T.",
    "Condemned: Criminal Origins", "F.E.A.R.", "Observer", "Visage", "Madison", "Infliction", "The Mortuary Assistant",
    "Granny", "Evil Nun", "Ice Scream", "Slender: The Eight Pages", "SCP: Containment Breach", "Penumbra: Black Plague",
    "Call of Cthulhu", "The Sinking City", "Bloodwash", "Murder House", "Nun Massacre", "Stay Out of the House",
    "Iron Lung", "Faith: The Unholy Trinity", "Signalis", "Darkwood", "World of Horror", "Inscryption", "Carrion",
    "Barotrauma", "GTFO", "The Forest", "Sons of the Forest", "7 Days to Die", "Project Zomboid", "DayZ",
    "Hunt: Showdown", "Back 4 Blood", "Left 4 Dead 2", "Killing Floor 2", "State of Decay 2", "Dying Light",
    "Dead Island 2", "Resident Evil Village", "Resident Evil 7: Biohazard", "Resident Evil 2 Remake", "Silent Hill 3",
    "Silent Hill 4: The Room", "Haunting Ground", "Rule of Rose", "Clock Tower", "Siren: Blood Curse", "Forbidden Siren 2",
    "Kuon", "Parasite Eve", "Dino Crisis", "Nightmare Creatures", "Alone in the Dark", "Blair Witch", "The Medium",
    "Manhunt 2", "Pathologic 2", "Scorn", "Agony", "Lust from Beyond", "Tormented Souls", "Them and Us",
    "Daymare: 1998", "White Day: A Labyrinth Named School", "Detention", "Devotion", "Bridge Curse: Road to Salvation",
    "Paper Dolls 2", "Home Sweet Home", "DreadOut 2", "Pamali: Indonesian Folklore Horror", "Pulang: Insanity",
    "Ghost at Dawn", "Cry of Fear", "Afraid of Monsters", "Nightmare House 2", "Grey", "Lost in Vivo", "Spooky's Jump Scare Mansion",
    "Bendy and the Ink Machine", "Poppy Playtime"
]

open_world = [
    "GTA V", "Red Dead Redemption 2", "The Witcher 3", "Cyberpunk 2077", "Elden Ring", "Skyrim", "Fallout 4",
    "Zelda: Tears of the Kingdom", "Minecraft", "No Man's Sky", "Assassin's Creed Valhalla", "Horizon Zero Dawn", "Ghost of Tsushima",
    "Genshin Impact", "Spider-Man: Miles Morales", "Batman: Arkham Knight", "Far Cry 5", "Watch Dogs: Legion", "Mad Max",
    "Just Cause 3", "Sleeping Dogs", "Bully", "Saints Row IV", "Middle-earth: Shadow of Mordor", "Dragon Age: Inquisition",
    "Mass Effect: Andromeda", "Starfield", "Outer Wilds", "Subnautica", "Valheim", "Rust", "Ark: Survival Evolved",
    "Conan Exiles", "Terraria", "Kenshi", "Mount & Blade II: Bannerlord", "Kingdom Come: Deliverance", "Mafia III",
    "L.A. Noire", "Dying Light: The Following", "Days Gone", "State of Decay 2", "Sea of Thieves", "Forza Horizon 5",
    "Need for Speed Heat", "The Crew Motorfest", "Burnout Paradise", "Driver: San Francisco", "Test Drive Unlimited Solar Crown",
    "BeamNG.drive", "Euro Truck Simulator 2", "American Truck Simulator", "Farming Simulator 22", "Microsoft Flight Simulator",
    "Elite Dangerous", "Eve Online", "World of Warcraft", "Final Fantasy XIV", "Guild Wars 2", "Black Desert Online",
    "New World", "Lost Ark", "Albion Online", "Runescape", "Roblox", "Lego Worlds", "DragonQuest Builders 2",
    "My Time at Sandrock", "Palworld", "Enshrouded", "Nightingale", "Smalland: Survive the Wilds", "Grounded", "Stranded Deep",
    "Green Hell", "Raft", "The Long Dark", "SCUM", "Miscreated", "H1Z1", "DayZ", "Unturned", "Goat Simulator 3",
    "Untitled Goose Game", "Maneater", "Prototype", "Infamous", "Sunset Overdrive", "Crackdown 3", "Mercenaries 2",
    "The Saboteur", "True Crime: New York City", "Scarface: The World is Yours", "The Godfather II", "Total Overdose",
    "Xenoblade Chronicles 3", "Death Stranding", "Biomutant", "Elex II", "GreedFall"
]

shooter = [
    "Fortnite", "PUBG Mobile", "Warzone", "Apex Legends", "Valorant", "CS2", "Rainbow Six Siege", "Overwatch 2",
    "Free Fire", "Call of Duty: Mobile", "Battlefield 2042", "Halo Infinite", "Doom Eternal", "Destiny 2", "Titanfall 2",
    "Team Fortress 2", "Left 4 Dead 2", "Gears 5", "Borderlands 3", "Escape from Tarkov", "Hunt: Showdown", "Insurgency: Sandstorm",
    "Squad", "Hell Let Loose", "Arma 3", "DayZ", "Rust", "Killing Floor 2", "World War Z", "Payday 3", "Deep Rock Galactic",
    "Helldivers 2", "The Finals", "Splitgate", "Quake Champions", "Unreal Tournament", "Serious Sam 4", "Wolfenstein: The New Order",
    "BioShock Collection", "Half-Life: Alyx", "Metro Exodus", "Crysis Remastered", "Sniper Elite 5", "Sniper Ghost Warrior Contracts 2",
    "Ghost Recon Breakpoint", "Division 2", "Outriders", "Warframe", "PlanetSide 2", "Paladins", "Rogue Company",
    "Hyper Scape", "Spellbreak", "Realm Royale", "Super People", "Bloodhunt", "Naraka: Bladepoint", "Farlight 84", "T3 Arena",
    "Modern Combat 5", "Shadowgun Legends", "Dead Effect 2", "N.O.V.A. Legacy", "Sniper Fury", "Hitman Sniper", "Critical Ops",
    "Standoff 2", "Bullet Echo", "MechArena", "World of Tanks", "World of Warships", "War Thunder", "Crossout", "Enlisted",
    "Verdun", "Tannenberg", "Isonzo", "Rising Storm 2: Vietnam", "Red Orchestra 2", "Post Scriptum", "Beyond The Wire",
    "Ready or Not", "Zero Hour", "SWAT 4", "Door Kickers 2", "Sniper Ghost Warrior 3", "Bulletstorm", "Rage 2",
    "Shadow Warrior 3", "Prodeus", "Dusk", "Amid Evil", "Ultrakill", "Turbo Overkill", "Metal: Hellsinger", "Boltgun",
    "Ion Fury", "Trepang2", "RoboCop: Rogue City", "Starfield"
]

platform_by_category = {
    'Action': 'PC, Console',
    'Horror': 'PC, Console',
    'Open World': 'PC, Console',
    'Shooter & Battle Royale': 'PC, Console'
}

future_dates = {
    'God of War Ragnarök': '2022-11-09T00:00:00',
    "Marvel's Spider-Man 2": '2023-10-20T00:00:00',
    'GTA VI': '2026-10-15T00:00:00',
    'FIFA 25': '2026-09-24T00:00:00',
    'Resident Evil 4 Remake': '2023-03-24T00:00:00',
    'Starfield': '2023-09-06T00:00:00',
    'Alan Wake 2': '2023-10-27T00:00:00',
    'Final Fantasy VII Rebirth': '2024-02-29T00:00:00',
    'Horizon Forbidden West': '2022-02-18T00:00:00',
    'Cyberpunk 2077': '2020-12-10T00:00:00',
    'Elden Ring': '2022-02-25T00:00:00'
}

seen_ids = {}

def slugify(name):
    base = re.sub(r"[^a-z0-9]+", '-', name.lower()).strip('-')
    if base in seen_ids:
        seen_ids[base] += 1
        return f"{base}-{seen_ids[base]}"
    seen_ids[base] = 1
    return base

all_games = []
for category, names in [('Action', action), ('Horror', horror), ('Open World', open_world), ('Shooter & Battle Royale', shooter)]:
    for name in names:
        game_id = slugify(name)
        release = future_dates.get(name, '2021-01-01T00:00:00')
        all_games.append({
            'id': game_id,
            'name': name,
            'category': category,
            'platform': platform_by_category[category],
            'releaseDate': release,
            'description': f"Explore {name}, a standout {category.lower()} title.",
            'link': f"https://example.com/{game_id}",
            'image': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80'
        })

content = 'const gameData = [\n'
for game in all_games:
    content += '    {\n'
    for key in ['id', 'name', 'category', 'platform', 'releaseDate', 'description', 'link', 'image']:
        val = game[key].replace('"', '\\"')
        content += f'        {key}: "{val}",\n'
    content += '    },\n'
content += '];\n'
Path('f:/MyAIApp/data.js').write_text(content, encoding='utf-8')
print(f'wrote {len(all_games)} games to data.js')
