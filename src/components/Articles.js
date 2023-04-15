import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import axios from 'axios';


import { selectArticles, filterArticles } from "../features/articles/articlesSlice";
import Search from "./Search";
import { Link, useSearchParams } from 'react-router-dom';

// Import Link and useSearchParams from React Router
const loadArticles = async () => {
    const response = await axios(`https://myclassr00m.herokuapp.com/api/articles`);

    return response.data;
}

export default function Articles () {
  const dispatch = useDispatch();

  const [articles, setArticles] = useState([])
  // const articles = useSelector(selectArticles);
  const [searchParams, setSearchParams ] = useSearchParams("")
  // Grab URLSearchParams object from useSearchParams hook
  
  // Get the queryParams from object returned from useSearchParams and set to `title`


  useEffect(() => {

    const rs = loadArticles()
    rs.then(data => setArticles(data)).catch(ex => {
      console.log(ex.message)
    })



  }, []);

  return (
    <main>
      <h1>Articles</h1>

      <ul>


        { articles.length > 0 && articles.map(article => (
          <li key={article.slug}>

            <Link to={`${article.slug}`}>
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
      <Search />
    </main>
  )
}
