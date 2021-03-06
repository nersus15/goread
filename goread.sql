PGDMP         1            	    w            goread    11.5    11.5     	           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false                       1262    16402    goread    DATABASE     �   CREATE DATABASE goread WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Indonesian_Indonesia.1252' LC_CTYPE = 'Indonesian_Indonesia.1252';
    DROP DATABASE goread;
             postgres    false            �            1259    16540    artikel    TABLE     �  CREATE TABLE public.artikel (
    id character varying NOT NULL,
    title character varying NOT NULL,
    content character varying NOT NULL,
    category character varying NOT NULL,
    status character varying NOT NULL,
    "createAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updateAt" timestamp without time zone DEFAULT now() NOT NULL,
    "creatorId" character varying NOT NULL
);
    DROP TABLE public.artikel;
       public         postgres    false            �            1259    16528    user    TABLE     �   CREATE TABLE public."user" (
    id character varying NOT NULL,
    email character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    salt character varying NOT NULL
);
    DROP TABLE public."user";
       public         postgres    false                      0    16540    artikel 
   TABLE DATA               l   COPY public.artikel (id, title, content, category, status, "createAt", "updateAt", "creatorId") FROM stdin;
    public       postgres    false    197   �                 0    16528    user 
   TABLE DATA               E   COPY public."user" (id, email, username, password, salt) FROM stdin;
    public       postgres    false    196   �       �
           2606    16549 &   artikel PK_bba1367c30e25eaba3e75f92b36 
   CONSTRAINT     f   ALTER TABLE ONLY public.artikel
    ADD CONSTRAINT "PK_bba1367c30e25eaba3e75f92b36" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.artikel DROP CONSTRAINT "PK_bba1367c30e25eaba3e75f92b36";
       public         postgres    false    197            �
           2606    16535 #   user PK_cace4a159ff9f2512dd42373760 
   CONSTRAINT     e   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760";
       public         postgres    false    196            �
           2606    16537 #   user UQ_78a916df40e02a9deb1c4b75edb 
   CONSTRAINT     f   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb";
       public         postgres    false    196            �
           2606    16539 #   user UQ_e12875dfb3b1d92d7d7c5377e22 
   CONSTRAINT     c   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22";
       public         postgres    false    196            �
           2606    16560 &   artikel FK_cddd9b9d876493590927a5f7f10    FK CONSTRAINT     �   ALTER TABLE ONLY public.artikel
    ADD CONSTRAINT "FK_cddd9b9d876493590927a5f7f10" FOREIGN KEY ("creatorId") REFERENCES public."user"(id);
 R   ALTER TABLE ONLY public.artikel DROP CONSTRAINT "FK_cddd9b9d876493590927a5f7f10";
       public       postgres    false    2692    197    196                 x����j�0���S�6h%���-���B(%����VĴI�v}�&пSN�������@C�@hgb�rDK	��0N�Y���歷ǽ)2�Nc����/p�g��{�9EMr���}g��yf5��;�吵�V����r;@�m�G\xԺ[�gO"]� � R�^�p�k����!u��r+й�A˖��X�UiT�5_|D���װ����as�[�5����_X���I Ĭ�M
�/3'�q���X�.���Y�{         �   x�}�Ao�0@��;�-_��mq!SȜ����j����wX������=P@�H$�JF!���B�*�D0#������{3�3���mV�z�^� O���)�(�ׇx3��ܥo�1\^fs�'��c�V�u��5�[d���e�
B1V�"�0H*V!�F,�o��(-<�B^���ҁug{��x�����k],��fqH��^m��9ַe�5�}��'b�     