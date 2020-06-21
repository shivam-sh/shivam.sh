---
title: Blog
layout: page
description: 'Hi!'
image: assets/images/blog.jpg
nav-menu: true
---

<!-- Main -->
<div id="main">

<!-- One -->
<section id="three">
	<div class="inner">
		<header class="major">
			<h2>Massa libero</h2>
		</header>
		<p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus pharetra. Pellentesque condimentum sem. In efficitur ligula tate urna. Maecenas laoreet massa vel lacinia pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus amet pharetra et feugiat tempus.</p>
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
