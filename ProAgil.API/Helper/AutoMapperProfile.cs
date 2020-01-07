using AutoMapper;
using ProAgil.API.DTOs;
using ProAgil.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProAgil.API.Helper
{
	public class AutoMapperProfile : Profile
	{
		public AutoMapperProfile()
		{
			CreateMap<Evento, EventoDTO>()
				.ForMember(dest => dest.Palestrantes, opt =>
				{
					opt.MapFrom(src => src.PalestrantesEventos.Select(x => x.Palestrante).ToList());
				}).ReverseMap();
			CreateMap<EventoDTO, Evento>().ReverseMap();

			CreateMap<Lote, LoteDTO>().ReverseMap();

			CreateMap<Palestrante, PalestranteDTO>().ForMember(dest => dest.Eventos, opt =>
			{
				opt.MapFrom(src => src.PalestrantesEventos.Select(x => x.Evento).ToList());
			}).ReverseMap();
			CreateMap<RedeSocial, RedeSocialDTO>().ReverseMap();


		}
	}
}
