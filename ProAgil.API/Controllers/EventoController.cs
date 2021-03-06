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
using System.IO;
using System.Net.Http.Headers;

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
				var retorno = mapper.Map<List<EventoDTO>>(eventos);
				return Ok(retorno);
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

		[HttpPost("upload")]
		public IActionResult Upload()
		{
			try
			{
				//pegando o arquivo no request
				var file = Request.Form.Files[0];
		
				if(file.Length>0)
				{
					//configurando a pasta
					var folderName = Path.Combine("Resources", "Images");
					//Configurando o diretorio junto com a pasta
					var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
	
					//pegando nome do arquivo
					var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName;
					var fullPath = Path.Combine(pathToSave, fileName.Replace("\"", " ".Trim()));

					using(var stream = new FileStream(fullPath, FileMode.Create))
					{
						file.CopyTo(stream);
					}
				}
				return Ok();
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
				var evento = await _context.GetAllEventoByIdAsync(id, false);
				if (evento == null)
					return NotFound();

				//mapeia as
				_context.Delete(evento.RedesSociais.Where(x => !model.RedesSociais.Select(y => y.Id).ToList().Contains(x.Id)).ToList());
				_context.Delete(evento.Lotes.Where(x => !model.Lotes.Select(y => y.Id).ToList().Contains(x.Id)).ToList());

				_mapper.Map(model, evento);

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