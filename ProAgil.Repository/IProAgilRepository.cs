using ProAgil.Domain;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ProAgil.Repository
{
    public interface IProAgilRepository 
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
		void Delete<T>(List<T> entities) where T : class;

        Task<bool> SaveChangesAsync();

        //Task<IEnumerable<T>> GetAllAsync();
        //Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> expression);
        //Task<T> GetById(int id);

		/// <summary>
		/// Apenas Seguindo o curso, seguir o exemplo da arquitetura do projeto minha api ou clinica veterinaria
		/// </summary>
		/// <returns></returns>
		Task<Evento[]> GetAllEventoByTemaAsync(string tema, bool palestrantes = false);
		Task<Evento[]> GetAllEventoAsync(bool palestrantes = false);
		Task<Evento> GetAllEventoByIdAsync(int id, bool palestrantes = false);

		Task<Palestrante[]> GetAllPalestranteAsync(bool eventos = false);
		Task<Palestrante[]> GetAllPalestranteByNameAsync(string nome, bool eventos = false);

		Task<Palestrante> GetPalestranteAsync(bool eventos = false);




	}
}