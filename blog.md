---
title: Blog
layout: page
description: ''
image: assets/images/blog.jpg
nav-menu: true
---

<!-- Main -->
<div id="main">

<!-- One -->
<section id="three">
	<div class="inner">
		<header class="major">
			<h2>Blog</h2>
		</header>
		
		<p>Welcome to my Blog! I write about any topics that interest me while usually being focused on technology and projects that I've worked on.</p>
		
	</div>
</section> 

<!-- Two -->
<section id="two" class="spotlights">
{%- for post in site.posts -%}
	{% if post.image %}

		<section>
			<a href="{{ post.url | relative_url }}" class="image">
				<img src="{{ site.baseurl }}/{{ post.image }}" alt="" data-position="center center" />
			</a>
			
			<div class="content">
				<div class="inner">
					<header class="major">
						<h3 class="title">{{ post.title | escape }}</h3>
					</header>
					<div class ="post-info">
						{%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
						<div class="post-date">{{ post.date | date: date_format }}</div>
						<ul class="categories">
							{%- for tag in post.categories -%}
								<li>{{ tag }}</li>
							{%- endfor -%}
						</ul>
					</div>

					{{ post.excerpt }}
					
					<ul class="actions">
						<li><a href="{{ post.url | relative_url }}" class="button">Read More</a></li>
					</ul>
				</div>
			</div>
		</section>

	{% else %}

		<section>
			<div class="alt-content">
				<div class="inner">
					<header class="major">
						<h3 class="title">{{ post.title | escape }}</h3>
					</header>
					<div class ="post-info">
						{%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
						<div class="post-date">{{ post.date | date: date_format }}</div>
						<ul class="categories">
							{%- for tag in post.categories -%}
								<li>{{ tag }}</li>
							{%- endfor -%}
						</ul>
					</div>

					{{ post.excerpt }}
					
					<ul class="actions">
						<li><a href="{{ post.url | relative_url }}" class="button">Read More</a></li>
					</ul>
				</div>
			</div>
		</section>

	{% endif %}
{%- endfor -%}

</section>

</div>
