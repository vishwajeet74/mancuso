import React, { useState, useEffect } from 'react';
import '../Style.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; // Import the spinner component

const API = "https://mancuso.ai/wp-json/v1/portfolios";

function Portfolio() {    
   function App() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [filterOptions, setFilterOptions] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [loading, setLoading] = useState(true); // Add loading state
    
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await axios.get(API);
          const allPosts = response.data;
    
          const allCategories = allPosts.flatMap(post => post.categories || []);
          const uniqueCategories = ['all', ...new Set(allCategories)].filter(Boolean).sort();
          
          const sortedCategories = ['all', ...uniqueCategories.filter(category => category !== 'all')];
    
          setFilterOptions(sortedCategories);
    
          setPosts(allPosts);
          setFilteredPosts(allPosts);
          setLoading(false); // Set loading to false after fetching data
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false); // Hide spinner if there's an error
        }
      };
    
      fetchPosts();
    }, []);
    
    const filterPosts = (category) => {
      setActiveCategory(category);
      if (category === 'all') {
        setFilteredPosts(posts);
      } else {
        const filtered = posts.filter(post => post.categories?.includes(category));
        setFilteredPosts(filtered);
      }
    };    
  
    return (
      <div className="bg-white section_padding">
        <div className='d-flex flex-wrap justify-content-end gap-2'>
          {filterOptions.map((category) => (
            <button 
              className={`text-capitalize ${activeCategory === category ? 'active' : ''}`}
              key={category} 
              onClick={() => filterPosts(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="row" style={{ marginTop: '30px' }}>
          {loading ? ( // Show spinner while loading
            <div className="d-flex justify-content-center">
              <ClipLoader color={"#217074"} loading={loading} size={80} />
            </div>
          ) : (
            filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div className="col-md-3 mb-0" key={post.id} style={{padding:'8px'}}>
                  <Link
                    to={`/portfolio/${post.id}`}
                    style={{ textDecoration: 'none' }}
                    className='portfolio_card'
                  >
                    <div className='image-container' style={{ position: 'relative', width: '100%' }}>
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
                      />
                        <div className='overlay-col' style={{
                        position: 'absolute',
                        width:'100%',
                        height:'100%',
                        top: '0',
                        left: '0',
                        backgroundColor: '#217074',
                        opacity: '0',
                        transition: 'opacity 0.3s ease',
                      }}>
                        <p>{post.title}</p>
                      </div>

                      <div className='overlay-text' style={{
                        position: 'absolute',
                        margin: '10px',
                        padding: '10px',
                        width:'78%',
                        top: '0',
                        left: '0',
                        color: '#fff',
                        backgroundColor: '#217074',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: '0',
                        transition: 'opacity 0.3s ease',
                      }}>
                        <p>{post.title}</p>
                      </div>

                      <div className='overlay-text-3' style={{
                        position: 'absolute',
                        margin: '10px',
                        padding: '2px 7px',
                        bottom: '0',
                        right: '0',
                        backgroundColor: '#fff',
                        color: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: '0',
                        transition: 'opacity 0.3s ease',
                      }}>
                        <span><i class="fa-regular fa-file-lines"></i></span>
                      </div>

                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>No posts available</p>
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='main_Content'>
      <section className='portfolio_section section_padding py-5 bg-white'>
        <h2 className='section-title text-start portfolio-title pt-4'>Portfolio</h2>
        <h5 className="section-description text-end">My Works</h5>
      </section>
      <section className='portfolio_content bg-white'>
      </section>
      {App()}
    </div>
  );
}

export default Portfolio;
