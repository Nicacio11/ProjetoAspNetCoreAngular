using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProAgil.Domain;

namespace ProAgil.Repository
{
	public class ProAgilRepository : IProAgilRepository
	{
		private readonly DataContext _context;

		public ProAgilRepository(DataContext context)
		{
			_context = context;

			//usado para não travar a query ao buscar 
			_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
		}

		public async Task<bool> SaveChangesAsync()
		{
			return (await _context.SaveChangesAsync()) > 0;
		}

		public void Add<T>(T entity) where T : class
		{
			_context.Add(entity);
		}

		public void Update<T>(T entity) where T : class
		{
			_context.Update(entity);
		}

		public void Delete<T>(T entity) where T : class
		{
			_context.Remove(entity);
		}

		public async Task<Evento[]> GetAllEventoByTemaAsync(string tema, bool palestrantes = false)
		{
			IQueryable<Evento> query = _context.Eventos
				.Include(x => x.Lotes)
				.Include(x => x.RedesSociais);
			if (palestrantes)
				query.Include(x => x.PalestrantesEventos).ThenInclude(x => x.Palestrante);

			query = query.OrderBy(x => x.DataEvento)
				.Where(x => x.Tema.Contains(tema));
			return await query.ToArrayAsync();
		}

		public async Task<Evento[]> GetAllEventoAsync(bool palestrantes = false)
		{
			IQueryable<Evento> query = _context.Eventos
				.Include(x => x.Lotes)
				.Include(x => x.RedesSociais);
			if (palestrantes)
				query.Include(x => x.PalestrantesEventos).ThenInclude(x => x.Palestrante);

			query = query.OrderBy(x => x.DataEvento);

			return await query.ToArrayAsync();
		}

		public async Task<Evento> GetAllEventoByIdAsync(int id, bool palestrantes = false)
		{
			IQueryable<Evento> query = _context.Eventos
				.Include(x => x.Lotes)
				.Include(x => x.RedesSociais);
			if (palestrantes)
				query.Include(x => x.PalestrantesEventos).ThenInclude(x => x.Palestrante);

			query = query.AsNoTracking().OrderBy(x => x.DataEvento)
				.Where(x => x.Id == id);
			return await query.FirstOrDefaultAsync();
		}

		public async Task<Palestrante[]> GetAllPalestranteAsync(bool eventos = false)
		{
			IQueryable<Palestrante> query = _context.Palestrantes
				.Include(x => x.RedesSociais);
			if (eventos)
				query.Include(x => x.PalestrantesEventos).ThenInclude(x => x.Evento);

			query = query.AsNoTracking().OrderBy(x => x.Nome);
			return await query.ToArrayAsync();
		}
		public async Task<Palestrante[]> GetAllPalestranteByNameAsync(string nome, bool eventos = false)
		{
			IQueryable<Palestrante> query = _context.Palestrantes
				.Include(x => x.RedesSociais);
			if (eventos)
				query.Include(x => x.PalestrantesEventos).ThenInclude(x => x.Evento);

			query = query.OrderBy(x => x.Nome).Where(x => x.Nome.ToLower().Contains(nome.ToLower()));
			return await query.ToArrayAsync();
		}

		public async Task<Palestrante> GetPalestranteAsync(bool eventos = false)
		{
			IQueryable<Palestrante> query = _context.Palestrantes
				.Include(x => x.RedesSociais);
			if (eventos)
				query.Include(x => x.PalestrantesEventos).ThenInclude(x => x.Evento);

			query = query.OrderBy(x => x.Nome);
			return await query.FirstOrDefaultAsync();
		}
	}
}