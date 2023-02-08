const Navbar = () => {
    return (
        <nav className='navbar is primary' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
    
        <a
          role='button'
          className={'navbar-burger burger'}
          aria-label='menu'
          aria-expanded='false'
          data-target='navbar'
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>
      </div>
      <div id='navbar' className='navbar-menu'>
        <div className='navbar-end'>
          <div className='navbar-item'>
            <a href='/' className='navbar-item'>
              Home
            </a>
            <a href='/rentals' className='navbar-item'>
              Rentals
            </a>
          </div>
        </div>
      </div>
    </nav>
    )
  }
  
  export default Navbar