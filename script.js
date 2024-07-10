// Importar a biblioteca D3.js
import * as d3 from 'd3-array';

// Carregar os dados do arquivo data.json
d3.json('data.json', (error, data) => {
  if (error) {
    console.error(error);
  } else {
    // Criar os gráficos e visualizações
    createSecurityChart(data.security);
    createResourceChart(data.resources);
    createActivityChart(data.activities);
  }
});

// Função para criar o gráfico de segurança
function createSecurityChart(data) {
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 300 - margin.left - margin.right;
  const height = 200 - margin.top - margin.bottom;

  const xScale = d3.scaleBand()
    .domain(data.map(d => d.date))
    .range([0, width])
    .padding(0.2);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([height, 0]);

  const g = d3.select('.security-chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  g.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.date))
    .attr('y', d => height - yScale(d.value))
    .attr('width', xScale.bandwidth())
    .attr('height', d => yScale(d.value));
}

// Funções para criar os gráficos de recursos e atividades
function createResourceChart(data) {
  // ...
}

function createActivityChart(data) {
  // ...
}