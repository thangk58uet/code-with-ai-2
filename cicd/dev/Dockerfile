#FROM 10.1.16.211:8005/support/nginx:latest
FROM k8sdev.mbbank.com.vn/support/nginx:1.21.4

#copy angular dist folder to container
COPY dist/code-with-ai /usr/share/nginx/html/view
COPY cicd/dev/L02/configmap-k8s/nginx-custom.conf /etc/nginx/conf.d/default.conf
# Add permissions for nginx user
RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid
# Set the default user.
USER nginx
# expose port 10406
EXPOSE 10406
