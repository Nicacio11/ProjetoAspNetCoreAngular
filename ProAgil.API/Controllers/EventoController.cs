using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using ProAgil.Repository;
using ProAgil.Domain;
using AutoMapper;
using ProAgil.API.DTOs;

namespace ProAgil.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class EventoController : ControllerBase
	{
		public readonly IProAgilRepository _context;
		public readonly IMapper _mapper;

		public EventoController(IProAgilRepository context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}
		[HttpGet]
		public async Task<IActionResult> Get([FromServices]IProAgilRepository context, [FromServices]IMapper mapper)
		{
			try
			{
				var eventos = await context.GetAllEventoAsync(true);
				return Ok(mapper.Map<List<EventoDTO>>(eventos));
			}
			catch (System.Exception ex)
			{
				return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados Falhou: {ex.Message}");
			}
		}
		[HttpGet("{id}")]
		public async Task<IActionResult> Get(int? id)
		{
			try
			{
				var evento = await _context.GetAllEventoByIdAsync(id.Value);
				if (evento == null)
					return NotFound();

				return Ok(_mapper.Map<EventoDTO>(evento));

			}
			catch (System.Exception ex)
			{
				return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados Falhou: {ex.Message}");

			}
		}

		[HttpPost]
		public async Task<IActionResult> Post(EventoDTO model)
		{
			try
			{
				var evento = _mapper.Map<Evento>(model);
				_context.Add(evento);
				if (await _context.SaveChangesAsync())
				{
					return Created($"/api/evento/{evento.Id}", _mapper.Map<EventoDTO>(evento));
				}
			}
			catch (System.Exception ex)
			{
				return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados Falhou: {ex.Message}");
			}
			return BadRequest();
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> Put(int id, EventoDTO model)
		{
			try
			{
				var evento = _context.GetAllEventoByIdAsync(id, false);
				if (evento == null)
					return NotFound();

				//mapeia as
				await _mapper.Map(model, evento);

				_context.Update(evento);
				if (await _context.SaveChangesAsync())
				{
					return Created($"/api/evento/{model.Id}", _mapper.Map<EventoDTO>(evento));
				}
			}
			catch (System.Exception ex)
			{
				return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados Falhou: {ex.Message}");
			}
			return BadRequest();
		}
		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			try
			{
				var evento = _context.GetAllEventoByIdAsync(id, false);
				if (evento == null)
					return NotFound();
				_context.Delete(evento.Result);
				if (await _context.SaveChangesAsync())
				{
					return Ok();
				}
			}
			catch (System.Exception ex)
			{
				return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados Falhou: {ex.Message}");
			}
			return BadRequest();
		}
	}
}