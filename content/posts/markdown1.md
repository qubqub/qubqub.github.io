---
title: "Hugo와 MarkDown: Text Color"
date: 2021-11-14T21:31:11+09:00
tags: ["MarkDown", "마크다운", "Hugo", "휴고", "Shortcode", "TextColor"]
---
    블로그를 Hugo를 이용해서 만들었는데, 열심히 html 코드로 텍스트에 컬러를 넣었지만 빌드를 하고 보니 텍스에 컬러가 적용이 되어있지않았다!


    알고 보니.. MarkDown에서는 본래 text color change를 지원하지 않는다.
    
    그리고 이것을 html을 이용해서 그 기능을 수행했던 것. 그런데 Hugo자체에서 html을 막아놨던 것!😑😑


    그냥 사용하는 방법으로는 unsafe를 True로 바꾸면 되지만... (막은데에는 이유가 있을거라고 생각하고...다른 방법을 선택!)


    그래서 이런 html코드를 수행해주는 새로운 코드들을 적용 시켜줘야하는데 고것이 바로 {{< color color="#46BEFF" text="Shortcode" >}}!
[참조]("https://gohugo.io/getting-started/configuration-markup#goldmark")

## {{< color color="#FFD400" text="Shortcode" >}}란 🧐
> Shortcodes are simple snippets inside your content files calling built-in or custom templates.


여기서 snippet이란 재사용이 가능한 소스코드이다. 우리가 작성하는 content안에서 이 Shortcode를 불러옴으로서 원하는 기능을 수행할 수 있게 해준다.

- {{< color color="#46BEFF" text="{{< Shortcode Parmeters >}}" >}} 형식을 따라 MarkDown에서 사용이 가능하다!
-  html 코드들을 적용 시킬 수 있다!

[자세한 설명]("https://gohugo.io/content-management/shortcodes/")

## {{< color color="#FFD400" text="Shortcode" >}}를 이용해 Text에 Color 입히기 🎨
1.  {{< color color="#F44336" text="layout" >}} 폴더 아래 {{< color color="#F44336" text="shortcodes" >}}라는 이름으로 폴더 생성!


2. 자신이 이 Shortcode를 부를 때 사용할 이름으로 {{< color color="#F44336" text="[Name].html" >}} 파일 생성! (내 경우 이름을 color라고 지정)


3.  `<span style=color:{{ .Get "color" }}>{{ .Get "text" }}</span> ` 작성!


4. content를 만들 때 색깔을 입히고 싶은 곳에 {{< color color="#F44336" text="{{< [Name] color=\"[Color]\" text=\"[Text]\" >}}" >}} 요로코롬  Shortcode를 호출하고 적용!


처음에는 이해하기 어려웠는데 Unity에서 쓰는 Component랑 비슷하다고 생각하니 개념에 좀 더 쉽게 다가갈 수 있었다.(어떤 오브젝트에게 어떠한 일을 시키고 싶을 때 Component를 추가하는 것 처럼?)