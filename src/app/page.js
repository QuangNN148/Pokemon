'use client';
import { useState } from 'react';
import Link from 'next/link';

// Component chính
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
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">Pokédex</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {detailedPokemons.map((pokemon) => (
          <Link 
            href={`/pokemon/${pokemon.id}`} 
            key={pokemon.name}
            className="block"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:scale-105 cursor-pointer h-full">
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-400 to-purple-600">
                {/* Sử dụng official artwork thay vì sprite cơ bản */}
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-40 object-contain z-10"
                />
                
                {/* Thêm hoạ tiết trang trí nền */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-24 h-24 rounded-full bg-white absolute -top-8 -right-8"></div>
                  <div className="w-16 h-16 rounded-full bg-white absolute bottom-4 left-4"></div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-2xl font-bold capitalize text-gray-800">
                    {pokemon.name}
                  </h2>
                  <div className="bg-indigo-100 rounded-full px-3 py-1 text-sm font-mono text-indigo-800 inline-block">
                    #{String(pokemon.id).padStart(3, '0')}
                  </div>
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
                
                {/* Thông tin nổi bật với biểu tượng */}
                <div className="grid grid-cols-2 gap-4 mt-4 bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="block text-xs text-gray-500 font-medium">CHIỀU CAO</span>
                      <span className="font-bold text-gray-700">{pokemon.height / 10} m</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="block text-xs text-gray-500 font-medium">CÂN NẶNG</span>
                      <span className="font-bold text-gray-700">{pokemon.weight / 10} kg</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center col-span-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div>
                      <span className="block text-xs text-gray-500 font-medium">KINH NGHIỆM</span>
                      <span className="font-bold text-gray-700">{pokemon.base_experience || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-6 text-center">Điều Hướng Pokédex</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {Array(5).fill().map((_, i) => (
            <button 
              key={i}
              className={`px-4 py-2 rounded-lg font-medium ${i === 0 ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'} shadow-sm transition-colors`}
            >
              {i * 20 + 1}-{Math.min((i + 1) * 20, 100)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}