using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ProAgil.Repository
{
    public class ProAgilRepository<T> : IProAgilRepository<T> where T : class
    {
        private readonly DataContext _context;

        public ProAgilRepository(DataContext context)
        {
            _context = context;
        }
        public void Add(T entity)
        {
            //_context.Set<T>().Add(entity);
            _context.Add(entity);
            _context.SaveChanges();
        }

        public void Delete(T entity)
        {
            //_context.Set<T>().Remove(entity);
            _context.Remove(entity);

        }
        public void Update(T entity)
        {
            //_context.Set<T>().Update(entity);
            _context.Attach(entity);
            _context.Update(entity);
        }
        public Task<IEnumerable<T>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public Task<T> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}