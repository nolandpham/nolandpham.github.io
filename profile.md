---
layout: default
title: Profile
permalink: /profile.html
---

# My Profile

## Experience

<div class="experience-list">
{% for job in site.data.experience %}
  <div class="experience-item">
    <h3>{{ job.title }} at <strong>{{ job.company }}</strong></h3>
    <p class="experience-dates"><em>{{ job.dates }} | {{ job.location }}</em></p>
    <div>{{ job.description | markdownify }}</div>
  </div>
{% endfor %}
</div>

<hr>

## Education

<div class="education-list">
{% for edu in site.data.education %}
  <div class="education-item">
    <h3>{{ edu.school }}</h3>
    <p class="education-dates"><em>{{ edu.dates }}</em></p>
    {% if edu.degree %}
    <p><strong>Degree:</strong> {{ edu.degree }}</p>
    {% endif %}
  </div>
{% endfor %}
</div>
