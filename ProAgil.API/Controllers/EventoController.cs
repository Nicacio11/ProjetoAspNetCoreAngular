using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ProAgil.API.Data;
using System.Linq;
using ProAgil.API.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace ProAgil.API.Controllers
{
    [Route("site/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        public readonly DataContext _context;

        public EventoController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromServices]DataContext context)
        {
            try
            {
                return Ok(await context.Eventos.ToListAsync());
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
                return Ok(await _context.Eventos.FirstOrDefaultAsync(x => x.EventoId == id.Value));

            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados Falhou");
            }
        }

    }
}