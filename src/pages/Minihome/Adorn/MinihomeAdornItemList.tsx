import React, { useEffect, useState } from "react";
import style from "@styles/Minihome/Adorn/MinihomeAdornItemList.module.css";
import { useUserStore } from "@store/store";
import MinihomeAdornItem from "./MinihomeAdornItem";

interface ItemData {
  imageUrl: string;
  itemCnt: number;
  itemGrade: string;
  itemId: number,
  itemName: string,
  userItemIds: null,
}

function MinihomeAdornItemList() {
  const { user } = useUserStore((state) => state);
  const [itemList, setItemList] = useState<ItemData[]>([]);
  const getItems = async () => {
    const response = await fetch(`https://222.121.46.20:80/items/${user?.nickname}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`
      }
    })
    const data = await response.json();
    setItemList(data);
  }
  useEffect(() => {
    getItems()
  },[])
  const items = itemList.map(e => <MinihomeAdornItem key={e.itemId} data={e}/>)
  return (
    <section className={style.main}>
      {items}
    </section>
  );
}

export default MinihomeAdornItemList;
