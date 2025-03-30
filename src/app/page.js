export default async function Page() {
  // Tăng số lượng Pokemon lên 100
  const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
  const posts = await data.json();
  
  // Lấy thông tin chi tiết cho mỗi Pokemon
  const getDetailedPokemon = async (url) => {
    const response = await fetch(url);
    return await response.json();
  };
  
  // Lấy dữ liệu chi tiết cho 20 Pokemon đầu tiên
  const detailedPokemons = [];
  for (let i = 0; i < 20; i++) {
    if (posts.results[i]) {
      const detail = await getDetailedPokemon(posts.results[i].url);
      detailedPokemons.push(detail);
    }
  }
  
  // Lấy tên tộc hệ (types) từ dữ liệu chi tiết
  const getTypeColor = (type) => {
    const typeColors = {
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      grass: 'bg-green-500',
      electric: 'bg-yellow-400',
      ice: 'bg-blue-200',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-300',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-700',
      ghost: 'bg-purple-700',
      dark: 'bg-gray-800',
      dragon: 'bg-indigo-700',
      steel: 'bg-gray-400',
      fairy: 'bg-pink-300',
      normal: 'bg-gray-300'
    };
    
    return typeColors[type] || 'bg-gray-300';
  };
  
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">Pokédex</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {detailedPokemons.map((pokemon) => (
          <div 
            key={pokemon.name} 
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
          >
            <div className={`bg-gradient-to-r from-indigo-500 to-purple-600 p-4 flex justify-center`}>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-24 h-24 object-contain"
              />
            </div>
            
            <div className="p-4">
              <div className="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700 inline-block mb-2">
                #{String(pokemon.id).padStart(3, '0')}
              </div>
              <h2 className="text-xl font-semibold capitalize text-gray-800">
                {pokemon.name}
              </h2>
              
              <div className="mt-2">
                <div className="flex gap-2 mb-2">
                  {pokemon.types.map(type => (
                    <span 
                      key={type.type.name}
                      className={`${getTypeColor(type.type.name)} text-white text-xs px-2 py-1 rounded-full`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-500">Height</span>
                    <span>{pokemon.height / 10} m</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">Weight</span>
                    <span>{pokemon.weight / 10} kg</span>
                  </div>
                  <div className="flex flex-col col-span-2">
                    <span className="text-gray-500">Base Experience</span>
                    <span>{pokemon.base_experience}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 flex justify-between items-center">
                <button className="text-sm bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-3 rounded-full transition-colors duration-300">
                  Chi tiết
                </button>
                <div className="flex gap-1">
                  {pokemon.abilities.slice(0, 2).map(ability => (
                    <span key={ability.ability.name} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {ability.ability.name.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-center">Điều Hướng Pokédex</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {Array(5).fill().map((_, i) => (
            <button 
              key={i}
              className={`px-4 py-2 rounded ${i === 0 ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {i * 20 + 1}-{Math.min((i + 1) * 20, 100)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}