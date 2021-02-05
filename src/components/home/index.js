import React from 'react'
import { Link } from 'react-router-dom'

const Home  = () => {
    return (
        <div className="home__container">
            <div className="home__buttonsContainer">            
                <Link to='/iris' >
                    <button className='btn btn-warning' >
                        Iris
                    </button>
                </Link>
                <Link to='/tuberculosis' >
                    <button className='btn btn-warning' >
                        Tuberculosis
                    </button>
                </Link>
                <Link to='/object-detection' >
                    <button className='btn btn-warning' >
                        Object Detection
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Home