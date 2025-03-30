// File: C:\Users\Admin\pokemon\src\app\pokemon\[id]\page.js
import Link from 'next/link';

// Hàm lấy chi tiết Pokemon theo ID
async function getPokemonDetails(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch Pokemon data');
  }
  
  return res.json();
}

// Hàm lấy thông tin loài Pokemon (species) để có thêm chi tiết
async function getPokemonSpecies(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching species data:", error);
    return null;
  }
}

export default async function PokemonDetail({ params }) {
  const pokemon = await getPokemonDetails(params.id);
  const species = await getPokemonSpecies(params.id);
  
  // Lấy mô tả Tiếng Anh từ dữ liệu species
  const description = species?.flavor_text_entries?.find(
    entry => entry.language.name === "en"
  )?.flavor_text?.replace(/\f/g, ' ') || "Không có mô tả.";
  
  // Lấy màu chủ đạo từ species
  const mainColor = species?.color?.name || "blue";
  
  // Ánh xạ màu từ API sang màu Tailwind
  const colorMap = {
    black: 'from-gray-700 to-gray-900',
    blue: 'from-blue-500 to-blue-700',
    brown: 'from-yellow-700 to-yellow-900',
    gray: 'from-gray-400 to-gray-600',
    green: 'from-green-500 to-green-700',
    pink: 'from-pink-400 to-pink-600',
    purple: 'from-purple-500 to-purple-700',
    red: 'from-red-500 to-red-700',
    white: 'from-gray-100 to-gray-300',
    yellow: 'from-yellow-400 to-yellow-600'
  };
  
  // Lấy màu gradient dựa trên màu chủ đạo
  const gradientColor = colorMap[mainColor] || 'from-blue-500 to-blue-700';
  
  // Lấy màu nền cho từng loại Pokemon
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Nút quay lại */}
        <Link 
          href="/" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Quay lại Pokédex
        </Link>
        
        {/* Header với thông tin cơ bản */}
        <div className={`bg-gradient-to-r ${gradientColor} rounded-xl p-6 shadow-lg text-white mb-6 relative overflow-hidden`}>
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/2">
              <div className="flex items-center mb-4">
                <h1 className="text-3xl font-bold capitalize mr-3">{pokemon.name}</h1>
                <span className="bg-white text-gray-800 rounded-full px-3 py-1 text-sm font-mono">
                  #{String(pokemon.id).padStart(3, '0')}
                </span>
              </div>
              
              <div className="flex gap-2 mb-4">
                {pokemon.types.map(type => (
                  <span 
                    key={type.type.name}
                    className={`${getTypeColor(type.type.name)} text-white text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wider`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
              
              <p className="text-white/90 mb-4">{description}</p>
              
              <div className="grid grid-cols-2 gap-4 bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                <div>
                  <p className="text-white/70 text-sm">Chiều cao</p>
                  <p className="font-bold">{pokemon.height / 10} m</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Cân nặng</p>
                  <p className="font-bold">{pokemon.weight / 10} kg</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Nhóm trứng</p>
                  <p className="font-bold capitalize">{species?.egg_groups?.map(g => g.name).join(', ') || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Khả năng</p>
                  <p className="font-bold capitalize">
                    {pokemon.abilities.map(a => a.ability.name.replace('-', ' ')).join(', ')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center items-center mt-6 md:mt-0">
              <img 
                src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-64 h-64 object-contain drop-shadow-2xl z-10"
              />
            </div>
          </div>
          
          {/* Hình trang trí nền */}
          <div className="absolute right-0 bottom-0 opacity-10">
            <svg width="200" height="200" viewBox="0 0 100 100" className="text-white">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="8" />
              <circle cx="50" cy="50" r="15" fill="currentColor" />
            </svg>
          </div>
        </div>
        
        {/* Thông tin chi tiết */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chỉ số cơ bản */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Chỉ số cơ bản</h2>
            
            {pokemon.stats.map(stat => {
              // Tính toán phần trăm cho thanh tiến trình (max 255 cho chỉ số Pokemon)
              const percentage = Math.min(100, (stat.base_stat / 255) * 100);
              
              // Màu cho thanh tiến trình
              let barColor;
              if (stat.base_stat < 50) barColor = "bg-red-500";
              else if (stat.base_stat < 70) barColor = "bg-yellow-500";
              else if (stat.base_stat < 90) barColor = "bg-blue-500";
              else barColor = "bg-green-500";
              
              return (
                <div key={stat.stat.name} className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {stat.stat.name.replace('-', ' ')}
                    </span>
                    <span className="text-sm font-medium text-gray-700">{stat.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`${barColor} h-2.5 rounded-full`} 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Thông tin khác */}
          <div className="grid grid-cols-1 gap-6">
            {/* Các hình ảnh khác */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Hình ảnh</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {pokemon.sprites.front_default && (
                  <img 
                    src={pokemon.sprites.front_default} 
                    alt={`${pokemon.name} front`} 
                    className="w-16 h-16 object-contain bg-gray-100 rounded-lg p-2"
                  />
                )}
                {pokemon.sprites.back_default && (
                  <img 
                    src={pokemon.sprites.back_default} 
                    alt={`${pokemon.name} back`} 
                    className="w-16 h-16 object-contain bg-gray-100 rounded-lg p-2"
                  />
                )}
                {pokemon.sprites.front_shiny && (
                  <img 
                    src={pokemon.sprites.front_shiny} 
                    alt={`${pokemon.name} shiny front`} 
                    className="w-16 h-16 object-contain bg-gray-100 rounded-lg p-2"
                  />
                )}
                {pokemon.sprites.back_shiny && (
                  <img 
                    src={pokemon.sprites.back_shiny} 
                    alt={`${pokemon.name} shiny back`} 
                    className="w-16 h-16 object-contain bg-gray-100 rounded-lg p-2"
                  />
                )}
              </div>
            </div>
            
            {/* Thông tin tiến hóa và sinh sản */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Thông tin khác</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Tỉ lệ nắm bắt</p>
                  <p className="font-bold">{species?.capture_rate || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Hạnh phúc cơ bản</p>
                  <p className="font-bold">{species?.base_happiness || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Tỉ lệ giới tính</p>
                  <p className="font-bold">
                    {species?.gender_rate !== -1 
                      ? `♂️ ${100 - (species?.gender_rate / 8) * 100}% / ♀️ ${(species?.gender_rate / 8) * 100}%` 
                      : 'Không giới tính'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Thế hệ</p>
                  <p className="font-bold capitalize">
                    {species?.generation?.name.replace('-', ' ') || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Danh sách di chuyển */}
        <div className="bg-white rounded-xl p-6 shadow-md mt-6">
          <h2 className="text-xl font-bold mb-4">Các kỹ năng (Moves)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên kỹ năng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phương thức học</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cấp độ học</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pokemon.moves.slice(0, 10).map(moveData => {
                  const levelUpDetails = moveData.version_group_details.find(
                    detail => detail.move_learn_method.name === "level-up"
                  );
                  
                  const learnMethod = moveData.version_group_details[0]?.move_learn_method.name.replace('-', ' ');
                  const learnLevel = levelUpDetails?.level_learned_at || "-";
                  
                  return (
                    <tr key={moveData.move.name} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                        {moveData.move.name.replace('-', ' ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {learnMethod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {learnLevel}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {pokemon.moves.length > 10 && (
              <div className="mt-4 text-center text-gray-500 text-sm">
                Hiển thị 10/{pokemon.moves.length} kỹ năng
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}