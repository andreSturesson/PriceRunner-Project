# Use the official .NET Core SDK image as the base image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the project file(s) to the container
COPY *.csproj ./

# Copy the remaining source code to the container
COPY . ./

RUN dotnet restore
# Build the application
RUN dotnet build -c Release --no-restore

# Publish the application
RUN dotnet publish -c Release --no-build -o out

# Use the official .NET Core Runtime image as the base image for the final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0

# Set the working directory inside the container
WORKDIR /app

# Copy the published output from the build stage to the final stage
COPY --from=build /app/out .

# Expose the port that the application listens on
EXPOSE 80

# Set the entry point for the container
ENTRYPOINT ["dotnet", "backend.dll"]