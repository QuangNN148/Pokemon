export default async function Page() {
  const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
  const posts = await data.json();
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">Pokédex</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.results.map((post, index) => (
          <div 
            key={post.name} 
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
          >
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 flex justify-center">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                alt={post.name}
                className="w-24 h-24 object-contain"
              />
            </div>
            
            <div className="p-4">
              <div className="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700 inline-block mb-2">
                #{String(index + 1).padStart(3, '0')}
              </div>
              <h2 className="text-xl font-semibold capitalize text-gray-800">
                {post.name}
              </h2>
              
              <div className="mt-3 flex justify-between items-center">
                <button className="text-sm bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-3 rounded-full transition-colors duration-300">
                  Chi tiết
                </button>
                <span className="text-xs text-gray-500">Click để xem thêm</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg shadow transition-colors duration-300 flex items-center">
          Xem thêm Pokemon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}