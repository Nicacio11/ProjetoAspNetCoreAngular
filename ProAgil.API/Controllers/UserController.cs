using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ProAgil.API.DTOs;
using ProAgil.Domain.Identity;

namespace ProAgil.API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class UserController : ControllerBase
	{
		private readonly IConfiguration _configuration;
		private readonly UserManager<User> _userManager;
		private readonly SignInManager<User> _signInManager;
		private readonly IMapper _mapper;

		public UserController(IConfiguration configuration,
								UserManager<User> userManager,
								SignInManager<User> signInManager,
								IMapper mapper)
		{
			_configuration = configuration;
			_userManager = userManager;
			_signInManager = signInManager;
			_mapper = mapper;
		}

		[HttpGet("GetUser")]
		public async Task<IActionResult> GetUser()
		{
			return Ok( new UserDTO());
		}
		[HttpPost("Register")]
		[AllowAnonymous]
		public async Task<IActionResult> Register(UserDTO userDTO)
		{
			try
			{
				var user = _mapper.Map<User>(userDTO);

				var result = await _userManager.CreateAsync(user, userDTO.Password);

				var userToReturn = _mapper.Map<UserDTO>(user);

				if (result.Succeeded)
				{
					return Created($"GetUser", userToReturn);
				}
				return BadRequest(result.Errors);
			}
			catch (Exception ex)
			{
				return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falhou {ex.Message }");
			}
		}

		[HttpPost("Login")]
		[AllowAnonymous]
		public async Task<IActionResult> Login(UserLoginDTO userLoginDTO)
		{
			try
			{
				var user = await _userManager.FindByNameAsync(userLoginDTO.UserName);
				var result = await _signInManager.CheckPasswordSignInAsync(user, userLoginDTO.Password, false);
				if (result.Succeeded)
				{
					var appUser = _userManager.Users.FirstOrDefault(x => x.NormalizedUserName == userLoginDTO.UserName.ToUpper());
					var userToReturn = _mapper.Map<UserLoginDTO>(appUser);
					return Ok(new
					{
						Token = GenerateJwt(appUser).Result,
						user = userToReturn
					});
				}
				return Unauthorized();
			}
			catch (Exception ex)
			{

				return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falhou {ex.Message }");

			}
			return Ok(userLoginDTO);
		}
		private async Task<string> GenerateJwt(User user)
		{
			//utilizado na autorização
			var claims = new List<Claim>()
			{
				new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
				new Claim(ClaimTypes.Name, user.UserName)
			};

			var roles = await _userManager.GetRolesAsync(user);

			foreach (var item in roles)
			{
				claims.Add(new Claim(ClaimTypes.Role, item));
			}
			var key = new SymmetricSecurityKey(Encoding.ASCII
									.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
			var tokenDescriptor = new SecurityTokenDescriptor()
			{
				Subject = new ClaimsIdentity(claims),
				Expires = DateTime.Now.AddDays(1),
				SigningCredentials = creds
			};

			var tokenHandler = new JwtSecurityTokenHandler();
			var token = tokenHandler.CreateToken(tokenDescriptor);

			return tokenHandler.WriteToken(token);
		}
	}
}