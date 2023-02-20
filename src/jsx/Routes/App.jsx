import { useEffect, useState } from 'react';
import { localhost } from '../views/component/atoms/constant/Url';
import RouterConfig from "./Route";
import styled from "styled-components";

const App = () => {
  const [ itemSelect, setItemSelect ] = useState();
  const [ items, setItems ] = useState();
  const [ instagramPosts, setInstagramPosts ] = useState([]);

  const handleItemSet = (num) => {
    setItemSelect(num);
  }

  const handleProps = () => {
    if (itemSelect === undefined || itemSelect === NaN) {
      return <RouterConfig handleItemSet={handleItemSet} items={items} />
    } else {
      let item = items[itemSelect - 1];
      return (
        <RouterConfig handleItemSet={handleItemSet} items={items} item={item} instagramPosts={instagramPosts}/>
      )
    }
  };

  useEffect(() => {
    fetch(localhost + "/getImage")
      .then((response) => {
        response.json()
      .then((data) => {
        setItems(data)
      });
    });
  }, []);

  useEffect(() => {
    fetch(localhost + "/getInstagramImage")
      .then((response) => {
        response.json()
      .then((data) => {
        setInstagramPosts(data)
      });
    });
  }, [items]);

  useEffect(() => {
    if (instagramPosts.length > 0) {
      const script = document.createElement("script");
      script.type = "text/javascript";

      let attr = document.createAttribute("src");
      attr.value = "//www.instagram.com/embed.js";
      script.setAttributeNode(attr);

      const head = document.getElementsByTagName("head")[0];
      head.appendChild(script);
    }
  }, [instagramPosts]);

  return handleProps()
};

export default App;