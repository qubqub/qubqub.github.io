---
title: "Draw Call: 드로우콜(3)"
date: 2021-11-26T22:47:40+09:00
tags: ["unity","DrawCall","Batch"]
categories: ["unity"]
cover:
  hidden: true
  image: "/logo/logo-unity-01.png"
  alt: "unity"
---

오늘 면접에서 이전에 드로우콜을 공부했던 것과 관련해서 질문을 받았다. 
<br>
배칭을 깨지 않고 오브젝트의 컬러를 바꿀 수 있는 방법을 말해보라고 하셨다.
<br>
하지만 난 모른다고 답했다. 그런 방법이 있나? 배칭을 깨지 않고 컬러를 바꾸는 것은 불가능하다고 생각했다.
<br>
 그리고 그건 불가능한 게 맞다.
<br>
하나의 머티리얼을 공유하는 오브젝트들이 여러 색깔을 낼 수 있는 것은 가능하다는 새로운 사실을 알아서 포스팅 해보려 한다.

## {{< color color="#FFD400" text="MaterialPropertyBlock" >}}의 활용 🧐
1. Create -> Shader -> Standard Surface Shader 생성.
2. `[PerRendererData]` 를 바꾸기 원하는 셰이더 프로퍼티 앞에 추가.
<br>

💚2 - 예시

```csharp
Shader "Custom/TestShader"
{
    Properties
    {
        [PerRendererData]_Color ("Color", Color) = (1,1,1,1)
        _MainTex ("Albedo (RGB)", 2D) = "white" {}
        _Glossiness ("Smoothness", Range(0,1)) = 0.5
        _Metallic ("Metallic", Range(0,1)) = 0.0
    }
}
```

3. 변경점 적용.

<br>

💚3 - 예시

```csharp
using UnityEngine;

public class MaterialColorChanger : MonoBehaviour
{
    public Color toColor;
    private Renderer _renderer;
    public Renderer Renderer
    {
        get
        {
            if (_renderer == null)
            {
                _renderer = GetComponent<Renderer>();
            }

            return _renderer;
        }
    }

    public void ChangeColor() //material의 컬러를 직접적으로 바꾸는 방법: 새로운 material instance가 생성됨.
    {
        Renderer.material.color = toColor;
    }
    public void ChangeColorWithPropertyBlock()//property의 값을 바꾸는 방법. 하나의 material을 사용하면서 서로 다른 값을 가질 수 있음.
    {
        var propertyBlock = new MaterialPropertyBlock();
        Renderer.GetPropertyBlock(propertyBlock);
        
        propertyBlock.SetColor("_Color", toColor);
        
        Renderer.SetPropertyBlock(propertyBlock);
    }
}
```
## 차이점 확인 🧐

**같은 머티리얼을 공유하는 4개의 오브젝트들을 미리 static batching이 되도록 설정을 해놓은 상태입니다.**

1. 렌더러에서 머티리얼의 값을 직접적으로 바꿨을 경우.

![이미지1](/images/studying6_2.png)

- 배칭이 불가능한 이유: 서로 다른 머티리얼을 사용하기 때문.
- 서로 다른 머티리얼을 사용한다는 것은 런타임 중에 새로운 머티리얼을 인스턴스했다는 것.

2. 프로퍼티의 값을 통해 바꿨을 경우.

![이미지2](/images/studying6_1.png)

- 배칭이 불가능한 이유: 서로 다른 프로퍼티 값을 가지고 있기 때문.(**즉 배칭을 유지하면서 컬러를 바꾸는 것은 불가능**)
- 하나의 공유된 머티리얼을 사용하지만 각자 다른 프로퍼티 값을 가지고 있다는 것.

![이미지3](/images/studying6_0.png)

- 하지만 **같은 프로퍼티 값을 가지고 있는 오브젝트들은 배칭이 유지된다.**
<br>

⚠️주의⚠️

<br>

`[PerRendererData]`을 쓰지 않을 경우: 함수들은 사용이 가능하지만 내부적으로 새 머티리얼 인스턴스 하기 때문에 결국은 1번의 방법과 같은 결과를 낳는다.

