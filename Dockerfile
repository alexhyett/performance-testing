FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

COPY src/*.csproj ./

WORKDIR /app
RUN dotnet restore

WORKDIR /app
COPY src/. ./
WORKDIR /app
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
EXPOSE 5157/tcp
ENV ASPNETCORE_URLS http://*:5157

COPY --from=build /app/out ./
ENTRYPOINT ["dotnet", "Age.dll"]