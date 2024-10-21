import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import './Breadcrumb.css'; // Your CSS file for styling

const Breadcrumb = ({ isSignedIn }) => {
  const location = useLocation();

  // Split the pathname into an array to create breadcrumb items
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Define the page name based on the URL path or signed-in state
  const currentPage = pathnames[pathnames.length - 1] || "Home";
  const pageName = (isSignedIn || location.pathname === '/signin') ? "My Account" : currentPage;

  return (
    <div className="breadcrumb-container">
      <div className="breadcrumb-left">
        <h2>{pageName.charAt(0).toUpperCase() + pageName.slice(1)}</h2>
      </div>
      <div className="breadcrumb-right">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <FontAwesomeIcon icon={faHome} />
              </Link>
            </li>
            {pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;

              return isLast ? (
                <li key={index} className="breadcrumb-item active" aria-current="page">
                  {isSignedIn || location.pathname === '/signin' ? "My Account" : name.charAt(0).toUpperCase() + name.slice(1)}
                </li>
              ) : (
                <li key={index} className="breadcrumb-item">
                  <Link to={routeTo}>{name.charAt(0).toUpperCase() + name.slice(1)}</Link>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
