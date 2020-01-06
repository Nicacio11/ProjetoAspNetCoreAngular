using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using ProAgil.Repository;
using ProAgil.Domain;

namespace ProAgil.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class EventoController : ControllerBase
	{
		public readonly IProAgilRepository _context;

		public EventoController(IProAgilRepository context)
		{
			_context = context;
		}
		[HttpGet]
		public async Task<IActionResult> Get([FromServices]IProAgilRepository context)
		{
			try
			{
				return Ok(await context.GetAllEventoAsync(true));
			}
			catch (System.Exception)
			{
				return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados Falhou");
			}
		}
		[HttpGet("{id}")]
		public async Task<IActionResult> Get(int? id)
		{
			try
			{
				return Ok(await _context.GetAllEventoByIdAsync(id.Value));

			}
			catch (System.Exception)
			{
				return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados Falhou");
			}
		}

		[HttpPost]
		public async Task<IActionResult> Post(Evento model)
		{
			try
			{
				_context.Add(model);
				if (await _context.SaveChangesAsync())
				{
					return Created($"/api/evento/{model.Id}", model);
				}
			}
			catch (System.Exception)
			{
				return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados Falhou");
			}
			return BadRequest();
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> Put(int id, Evento model)
		{
			try
			{
				var evento = _context.GetAllEventoByIdAsync(id, false);
				if (evento == null)
					return NotFound();
				_context.Update(model);
				if (await _context.SaveChangesAsync())
				{
					return Created($"/api/evento/{model.Id}", model);
				}
			}
			catch (System.Exception)
			{
				return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados Falhou");
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
				return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados Falhou");
			}
			return BadRequest();
		}
	}
}