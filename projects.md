---
layout: default
title: Projects
permalink: /projects.html
---

# My Projects

Here are some of the projects I've worked on.

<div class="projects-list">
{% for project in site.data.projects %}
  <div class="project-item">
    <h3>{{ project.name }}</h3>
    <p class="project-date"><em>{{ project.date }}</em></p>
    <p>{{ project.description }}</p>
  </div>
{% endfor %}
</div>
