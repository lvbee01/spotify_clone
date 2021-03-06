class Api::PlaylistsController < ApplicationController
  def index
    @playlists = Playlist.all

    # @playlists = Playlist.where('author_id = ?', params[:user_id]) # use this one!
    # @playlists = Playlist.find_by(author_id: params[:user_id])
  end

  # def song_index
  #   @songs = Playlist.songs.where('playlist_id = ?', params[:id])
  # end

  def create
    @playlist = Playlist.new(playlist_params)
    @playlist.author = current_user

    if @playlist.save
      render "api/playlists/show"
    else
      render json: @playlist.errors.full_messages, status: 422
    end

  end

  def show
    @playlist = Playlist.find_by(id: params[:id])
    render :show
  end

  def update
    @playlist = current_user.playlists.find_by(id: params[:id])

    if @playlist.update(link_params)
      render "api/playlists/show"
    else
      render json: @playlist.errors.full_messages, status: 422
    end

  end

  def destroy
    playlist = Playlist.find_by(id: params[:id])
    playlist.destroy
    render json: {}
  end

  private
  def playlist_params
    params.require(:playlist).permit(:title, :description, :img_path)
  end
end
