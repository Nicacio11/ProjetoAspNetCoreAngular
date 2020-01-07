using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProAgil.API.DTOs
{
	/// <summary>
	/// AutoMapper.Extensions.Microsoft.DependencyInjection
	/// </summary>
	public class EventoDTO
	{
		public int Id { get; set; }
		[Required(ErrorMessage = "O campo {0} é obrigatório!")]
		[StringLength(100, MinimumLength = 4, ErrorMessage = "Local entre 3 e 100 caracteres")]
		public string Local { get; set; }
		public string DataEvento { get; set; }
		[Required]
		public string Tema { get; set; }
		[Range(2, 120000, ErrorMessage = "Quantidade de pessoas entre 2 e 120000")]
		public int QtdPessoas { get; set; }
		public string ImagemUrl { get; set; }
		[Phone]
		public string Telefone { get; set; }

		[EmailAddress(ErrorMessage = "E-mail inválido")]
		public string Email { get; set; }

		public List<LoteDTO> Lotes { get; set; }
		public List<RedeSocialDTO> RedesSociais { get; set; }
		public List<PalestranteDTO> Palestrantes { get; set; }
	}
}
