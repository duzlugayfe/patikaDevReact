import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

import emojiList from "../emojiList.json";
import App from "../App";

describe("Emoji Search Tests",()=>{
  let header,emoji,input;
  let filterList;

  beforeEach(()=>{
      // eslint-disable-next-line testing-library/no-render-in-setup
      render(<App/>);
    })
    
    
    it('header render test', () => { 
      header = screen.getByText(/Emoji Search/i);
      expect(header).toBeInTheDocument(); // header text kontrolu

      const images = screen.getAllByRole("img"); 
      expect(images[0]);
      expect(images[1]); // 2 tane img'ye sahip olmalı!
    })
    
    
    test("emoji list control",()=>{
      emoji = emojiList.slice(0,19); // ilk 20 elemanı keselim
      // listedeki ilk 20 eleman ekranda gosterilmişmi kontrolü
      emoji.map((item)=> {expect(screen.getByText(item.title)).toBeInTheDocument();});
    })
    
    
    test("emoji list filter and re-render",()=>{
    input = screen.getByRole("textbox"); // input'a ulaşalım
    const filter = "smile cat";
    filterList = emojiList.filter(it => it.keywords.toLowerCase().match(filter) || it.title.toLowerCase().match(filter) );
    // console.log(filterList); // emojiList'de filtreleme yapınca gelencek sonuc , 
    // 2 elemana sahip sonu ortaya çıkıyor aynısı input'a girilen filtre durumunda çıkmalı: 
    fireEvent.change(input, { target: { value: filter } });
    expect(screen.getAllByText(/cat/i)).toHaveLength(2);
  });

    test('proof that after click emoji, copy', async () => {
      const click = screen.getByText("100");
      expect(click.parentElement.getAttribute("data-clipboard-text").length).toBeGreaterThan(0);
      console.log(click.parentElement.getAttribute("data-clipboard-text"));
      expect(click.parentElement.getAttribute("data-clipboard-text")).toMatch("💯");
  });


});
