#FROM 10.1.16.211:8005/support/nginx:latest
FROM 10.1.27.43/support/nginx:1.21.4

#copy angular dist folder to container 
COPY dist/code-with-ai /usr/share/nginx/html/view
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# expose port 10406 
EXPOSE 10406
