FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
COPY ./*.csproj ./
RUN dotnet restore
COPY . .
RUN dotnet restore
RUN dotnet build -c Release --no-restore
RUN dotnet publish -c Release --no-build -o /app/publish
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "backend.dll"]