using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProAgil.Domain;
using ProAgil.Domain.Identity;

namespace ProAgil.Repository
{
    public class DataContext : IdentityDbContext<Domain.Identity.User, Role, int,
                                                IdentityUserClaim<int>,
                                                UserRole, IdentityUserLogin<int>,
                                                IdentityRoleClaim<int>, 
                                                IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<Evento> Eventos { get; set; }

        public DbSet<Lote> Lotes { get; set; }

        public DbSet<Palestrante> Palestrantes { get; set; }

        public DbSet<PalestranteEvento> PalestrantesEventos { get; set; }
        public DbSet<RedeSocial> RedesSociais { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRole>(userRole => {
                userRole.HasKey(x => new { x.UserId, x.RoleId});
                userRole.HasOne(x => x.Role).WithMany(x => x.UserRoles)
                    .HasForeignKey(x => x.RoleId)
                    .IsRequired();
                userRole.HasOne(x => x.User).WithMany(x => x.UserRoles)
                    .HasForeignKey(x => x.UserId)
                    .IsRequired();
            });
            modelBuilder.Entity<PalestranteEvento>()
                .HasKey(PE => new { PE.EventoId, PE.PalestranteId });

        }

    }
}